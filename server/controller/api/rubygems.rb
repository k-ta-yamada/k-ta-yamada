# frozen_string_literal: true

# /api/rubygems
namespace '/api/rubygems' do # rubocop:disable Metrics/BlockLength
  get '' do
    data = settings.cache.fetch(request.path) do
      response = Gems.gems('k-ta-yamada')
      logger.info "-- update cache: #{request.path}"
      response.map do |d|
        { name: d['name'],
          info: d['info'],
          project_uri: d['project_uri'],
          source_code_uri: d['source_code_uri'],
          documentation_uri: d['documentation_uri'],
          version: d['version'],
          version_downloads: d['version_downloads'],
          downloads: d['downloads'] }
      end
    end

    etag Digest::SHA1.hexdigest(data.to_s)
    content_type :json
    json data
  end

  get '/cache-clear' do
    settings.cache.delete_matched(Regexp.new(File.dirname(request.path)))
    'done'
  end

  get '/:gem_name' do |gem_name|
    data = settings.cache.fetch(request.path) do
      response = Gems.versions(gem_name).sort_by { |v| v['number'] }
      logger.info "-- update cache: #{request.path}"
      response.last(10).map do |d|
        { number: d['number'],
          downloads_count: d['downloads_count'] }
      end
    end

    etag Digest::SHA1.hexdigest(data.to_s)
    content_type :json
    json data
  end
end
