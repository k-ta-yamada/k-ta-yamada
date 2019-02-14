# frozen_string_literal: true

GITHUB_API = 'https://api.github.com/repos/k-ta-yamada/k-ta-yamada'

# /api/commit
namespace '/api/commit' do # rubocop:disable Metrics/BlockLength
  get '/branches' do
    data = settings.cache.fetch(request.path) do
      logger.info "-- update cache: #{request.path}"
      response = JSON.parse(RestClient.get("#{GITHUB_API}/branches"))
      response.map { |d| d['name'] }
    end

    etag Digest::SHA1.hexdigest(data.to_s)
    content_type :json
    json data
  end

  get '/commits' do
    branche = params[:branche]
    data = settings.cache.fetch("#{request.path}/#{branche}") do
      logger.info "-- update cache: #{request.path}/#{branche}"
      response =
        JSON.parse(RestClient.get("#{GITHUB_API}/commits?sha=#{branche}"))
      response.map do |d|
        { sha: d['sha'],
          commit_message: d['commit']['message'],
          commit_author_date: d['commit']['author']['date'],
          commit_author_name: d['commit']['author']['name'],
          html_url: d['html_url'] }
      end
    end

    etag Digest::SHA1.hexdigest(data.to_s)
    content_type :json
    json data
  end

  get '/cache-clear' do
    content_type :text
    settings.cache.delete_matched(Regexp.new(File.dirname(request.path)))
    'done'
  end
end
