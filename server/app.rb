# frozen_string_literal: true

require 'bundler'
Bundler.require(:default)
Bundler.require(Sinatra::Base.environment)

require 'json'
require 'sinatra/reloader' if settings.development?
require 'sinatra/json'
require 'sinatra/namespace'

# for configure: cache
EXPIRES_IN_MINUTE = ENV['EXPIRES_IN_MINUTE'] || 60
RACE_CONDITION_TTL = 5
CACHE = ActiveSupport::Cache::MemoryStore.new(
  expires_in: EXPIRES_IN_MINUTE.to_i.minute,
  race_condition_ttl: RACE_CONDITION_TTL
)

# for configure: index_html and helpers#index_html
INDEX_HTML = './public/index.html'

# for before
MY_DOMAIN = 'k-ta-yamada.me'

# for /sitemap.txt
META_DESCRIPTION = {
  '/': "Hi, I'm k-ta-yamada. This is my site.",
  '/profile': 'My Profile and Skills.',
  '/articles': 'Articles written on https://qiita.com.',
  '/rubygems': 'My RubyGems info.',
  '/commit': 'The commit log of this site.',
  '/plank': 'Record of 30 days Plank Challenge.',
  '/xdaysofcode': 'Record of #100DaysOfCode Challenge.'
}.freeze

# ##################################################
# configure
# ##################################################
configure do
  use Rack::Deflater

  set :cache, CACHE
  set :static_cache_control, [max_age: 60 * 60 * 24 * 365]
  set :server, :webrick if settings.development?
  set :logging, settings.development? ? Logger::DEBUG : Logger::INFO

  set :app_started_at, Time.now
  set :index_html, File.read(INDEX_HTML)
  set :public_folder, File.expand_path('../public', __dir__)
end

# ##################################################
# helpers
# ##################################################
helpers do
  # settings.production?でない場合は対象ファイル(INDEX_HTML)を再度読み込む
  def index_html
    settings.production? ? settings.index_html : File.read(INDEX_HTML)
  end
end

# ##################################################
# before
# ##################################################
before do
  # request.env.each { |k, v| logger.debug "  #{k.ljust(25)} => [#{v}]" }
  logger.info "Sinatra::Base.environment: [#{Sinatra::Base.environment}]"

  # :nocov:
  if settings.production?
    unless request.secure?
      redirect to("https://#{request.host_with_port}#{request.path}")
    end
    unless request.host == MY_DOMAIN
      redirect to("https://#{MY_DOMAIN}#{request.path}")
    end
  end
  # :nocov:
end

# ##################################################
# routing
# ##################################################
require_relative './controller/api/articles'
require_relative './controller/api/rubygems'
require_relative './controller/api/commit'
require_relative './controller/api/plank'
require_relative './controller/api/xdaysofcode'

get '/' do
  etag Digest::SHA1.hexdigest(index_html)
  index_html
end

get '/ping' do
  content_type :json
  {
    status: 'ok',
    app_started_at: settings.app_started_at,
    # heroku_app_id: ENV['HEROKU_APP_ID'],
    # heroku_app_name: ENV['HEROKU_APP_NAME'],
    # heroku_dyno_id: ENV['HEROKU_DYNO_ID'],
    heroku_release_created_at: ENV['HEROKU_RELEASE_CREATED_AT'],
    heroku_release_version: ENV['HEROKU_RELEASE_VERSION'],
    # heroku_slug_commit: ENV['HEROKU_SLUG_COMMIT'],
    heroku_slug_description: ENV['HEROKU_SLUG_DESCRIPTION']
  }.to_json
end

get '/sitemap.txt' do
  content_type :text

  routes = %w[/ /ping /sitemap.txt].concat(META_DESCRIPTION.keys.map(&:to_s))
  routes.uniq!.map! { |v| "#{request.scheme}://#{request.host_with_port}#{v}" }
  routes.join("\n")
end

# for SPA fallback
get %r{\/(?!api)(.*)} do
  etag Digest::SHA1.hexdigest(index_html)
  index_html
end
