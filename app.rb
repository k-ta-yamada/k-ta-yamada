# frozen_string_literal: true

require 'bundler'
Bundler.require(:default)
Bundler.require(Sinatra::Base.environment)

require 'json'
require 'sinatra/reloader' if settings.development?
require 'sinatra/json'
require 'sinatra/namespace'

use Rack::Deflater

set :server, :webrick if settings.development?
set :logging, settings.development? ? Logger::DEBUG : Logger::INFO
set :static_cache_control, [max_age: 60 * 60 * 24]

# before
MY_DOMAIN = 'k-ta-yamada.me'

META_DESCRIPTION = {
  '/': "Hi, I'm k-ta-yamada. This is my site.",
  '/prof': 'My Profile and Skills.',
  '/rubygems': 'My RubyGems info.',
  '/repo': 'The commit log of this site.',
  '/30day_plank_challenge': 'Record of 30 days Plank Challenge.'
}.freeze

# /ping
STARTED_AT = Time.now

# js()
JS_HASH = File.basename(Dir.glob('./public/js/app*.js').first, '.js')
              .split('-').last

# /plank
PLANK_START_DAY = Date.new(2018, 10, 23)
PLANK_RESULT_FILE_NAME = '30day_plank_challenge.result'

EXPIRES_IN_MINUTE = ENV['EXPIRES_IN_MINUTE'] || 1
RACE_CONDITION_TTL = 5

configure do
  cache = ActiveSupport::Cache::MemoryStore.new(
    expires_in: EXPIRES_IN_MINUTE.to_i.minute,
    race_condition_ttl: RACE_CONDITION_TTL
  )
  set :cache, cache
end

before do
  # request.env.each { |k, v| logger.debug "  #{k.ljust(25)} => [#{v}]" }
  logger.info "Sinatra::Base.environment: [#{Sinatra::Base.environment}]"
  path =
    request.path == '/' ? nil : " | #{request.path.split('/')[1..-1].join('/')}"
  @title = "#{MY_DOMAIN}#{path}"
  @meta_description = META_DESCRIPTION[request.path.to_sym]
  @scheme = request.scheme
  @host = request.host
  @url = request.url

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
# helpers
# ##################################################
helpers do
  def js_hash
    File.basename(Dir.glob('./public/js/app*.js').first, '.js')
        .split('-').last
  end

  def js(filename)
    basename = File.basename(filename, '.*').to_sym
    name = basename == :layout ? :app : basename
    hash = settings.production? ? JS_HASH : js_hash
    "js/#{name}-#{hash}.js"
  end
end

# ##################################################
# /
# ##################################################
namespace '/' do
  get '' do
    slim :index
  end

  get 'ping' do
    content_type :json
    { status: 'ok', started_at: STARTED_AT }.to_json
  end

  get 'sitemap.txt' do
    content_type :text
    routes = %w[
      /
      /ping
      /sitemap.txt
      /prof
      /articles
      /rubygems
      /repo
      /30day_plank_challenge
    ]
    routes.map { |v| "https://#{MY_DOMAIN}#{v}" }.join("\n")
  end
end

# ##################################################
# /prof
# ##################################################
namespace '/prof' do
  get '' do
    slim :prof
  end
end

# ##################################################
# /rubygems
# ##################################################
namespace '/rubygems' do # rubocop:disable Metrics/BlockLength
  get '' do
    @production = settings.production?
    slim :rubygems
  end

  get '.json' do
    data = settings.cache.fetch(request.path) do
      data = Gems.gems('k-ta-yamada')
      logger.info "-- update cache: #{request.path}"
      data
    end

    etag Digest::SHA1.hexdigest(data.to_s)
    content_type :json
    json data
  end

  get '/cache-clear' do
    settings.cache.delete_matched(Regexp.new(File.dirname(request.path)))
    redirect to(:rubygems)
  end

  get '/:gem_name' do |gem_name|
    data = settings.cache.fetch(request.path) do
      data = Gems.versions(gem_name).sort_by { |v| v['number'] }
      logger.info "-- update cache: #{request.path}"
      data
    end

    etag Digest::SHA1.hexdigest(data.to_s)
    content_type :json
    json data
  end
end

# ##################################################
# /repo
# ##################################################
GITHUB_API = 'https://api.github.com/repos/k-ta-yamada/k-ta-yamada'
namespace '/repo' do # rubocop:disable Metrics/BlockLength
  get '' do
    @production = settings.production?
    slim :repo
  end

  get '/branches' do
    data = settings.cache.fetch(request.path) do
      logger.info "-- update cache: #{request.path}"
      JSON.parse(RestClient.get("#{GITHUB_API}/branches"))
    end

    etag Digest::SHA1.hexdigest(data.to_s)
    content_type :json
    json data
  end

  get '/commits' do
    branche = params[:branche]
    data = settings.cache.fetch("#{request.path}/#{branche}") do
      logger.info "-- update cache: #{request.path}/#{branche}"
      JSON.parse(RestClient.get("#{GITHUB_API}/commits?sha=#{branche}"))
    end

    etag Digest::SHA1.hexdigest(data.to_s)
    content_type :json
    json data
  end

  get '/clear-cache' do
    settings.cache.delete_matched(Regexp.new(File.dirname(request.path)))
    redirect to(:repo)
  end
end

# ##################################################
# /30day_plank_challenge
# ##################################################
namespace '/30day_plank_challenge' do # rubocop:disable Metrics/BlockLength
  helpers do
    A = Struct.new(:task, :result)

    def bg_color(record)
      rest?(record.task) || success?(record.result)
    end

    def rest?(task)
      return nil if task.is_a?(Numeric)

      task == :rest ? 'info' : nil
    end

    def success?(result)
      result ? 'success' : nil
    end

    def today?(day)
      PLANK_START_DAY + day - 1 == Date.today
    end

    def calc_date(day)
      date = PLANK_START_DAY + day - 1
      mm = format('%02d', date.mon)
      dd = format('%02d', date.day)
      wday = %w[sun mon tue wed thu fri sat][date.wday]
      "#{mm}/#{dd} #{wday}"
    end
  end

  get '' do
    def to_i_to_sym(task, result)
      [task.to_i.zero? ? task.to_sym : task.to_i,
       result.nil? ? nil : result.to_i]
    end

    def decorate(task, result)
      [task.is_a?(Numeric) ? "#{task} sec" : task,
       result.is_a?(Numeric) ? "#{result} sec" : result]
    end

    @list = File.readlines(PLANK_RESULT_FILE_NAME).map(&:split)
                .map { |a, b| to_i_to_sym(a, b) }
                .map { |a, b| decorate(a, b) }
                .map { |v| A.new(*v) }

    slim :"30day_plank_challenge"
  end
end

# ##################################################
# /articles
# ##################################################
QIITA_API = 'https://qiita.com/api/v2/users/k-ta-yamada/items'
namespace '/articles' do
  get '' do
    total_count = settings.cache.fetch("#{request.path}/total_count") do
      logger.info "-- update cache: #{request.path}/total_count"
      RestClient.get(QIITA_API).headers[:total_count].to_i
    end
    @articles = settings.cache.fetch("#{request.path}/articles") do
      logger.info "-- update cache: #{request.path}/articles"
      JSON.parse(RestClient.get("#{QIITA_API}?per_page=#{total_count}"))
    end

    slim :article
  end
end
