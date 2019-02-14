# frozen_string_literal: true

QIITA_API = 'https://qiita.com/api/v2/users/k-ta-yamada/items'

# /api/articles
namespace '/api/articles' do # rubocop:disable Metrics/BlockLength
  get '' do
    total_count = settings.cache.fetch("#{request.path}/total_count") do
      logger.info "-- update cache: #{request.path}/total_count"
      RestClient.get(QIITA_API).headers[:total_count].to_i
    end

    articles = settings.cache.fetch("#{request.path}/articles") do
      logger.info "-- update cache: #{request.path}/articles"
      respose =
        JSON.parse(RestClient.get("#{QIITA_API}?per_page=#{total_count}"))
      respose.sort_by { |v| v['likes_count'] }.reverse.map do |a|
        { title: a['title'],
          url: a['url'],
          tags: a['tags'].map { |t| t['name'] }.join(', '),
          created_at: a['created_at'],
          updated_at: a['updated_at'],
          likes_count: a['likes_count'] }
      end
    end

    etag Digest::SHA1.hexdigest(articles.to_s)
    content_type :json
    json articles
  end

  get '/cache-clear' do
    content_type :text
    settings.cache.delete_matched(Regexp.new(File.dirname(request.path)))
    'done'
  end
end
