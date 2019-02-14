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
  '/30day_plank_challenge': 'Record of 30 days Plank Challenge.',
  '/100daysofcode': 'Record of #100DaysOfCode Challenge.',
}.freeze

# /ping
STARTED_AT = Time.now

# js()
JS_HASH = File.basename(Dir.glob('./public/js/app*.js').first, '.js')
              .split('-').last

# /plank
PLANK_START_DAY = Date.new(2018, 10, 23)
PLANK_RESULT_FILE_NAME = '30day_plank_challenge.result'

EXPIRES_IN_MINUTE = ENV['EXPIRES_IN_MINUTE'] || 60
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

  @production = settings.production?

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
      /100daysofcode
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
      data.last(10)
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

  get '/cache-clear' do
    settings.cache.delete_matched(Regexp.new(File.dirname(request.path)))
    redirect to(:repo)
  end
end

# ##################################################
# /30day_plank_challenge
# ##################################################
namespace '/30day_plank_challenge' do # rubocop:disable Metrics/BlockLength
  WEEK = %w[sun mon tue wed thu fri sat].freeze
  # rubocop:disable Metrics/BlockLength
  Record = Struct.new(:day, :task, :result) do
    def display_day
      format('%03d', day)
    end

    def display_date
      [date, wday].join(' ')
    end

    def display_task
      decorate(task.to_i.zero? ? task.to_sym : task.to_i)
    end

    def display_result
      decorate(result.nil? ? nil : result.to_i)
    end

    def bg_color
      [
        bg_color_rest,
        bg_color_success,
        bg_color_today
      ].uniq.join(' ')
    end

    def today?
      date == Date.today
    end

    private

    def date
      PLANK_START_DAY + day - 1
    end

    def year
      date.year
    end

    def mmdd
      mm = format('%02d', date.month)
      dd = format('%02d', date.day)
      "#{mm}/#{dd}"
    end

    def wday
      WEEK[date.wday]
    end

    def decorate(val)
      val.is_a?(Numeric) ? "#{val} sec" : val
    end

    def bg_color_rest
      task == 'rest' ? 'info' : nil
    end

    def bg_color_success
      result ? 'success' : nil
    end

    def bg_color_today
      today? ? 'warning' : nil
    end
  end
  # rubocop:enable Metrics/BlockLength

  get '' do
    @list = File.readlines(PLANK_RESULT_FILE_NAME).map(&:split)
                .map.with_index(1) { |(t, r), i| Record.new(i, t, r) }
                .reverse

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

  get '/cache-clear' do
    settings.cache.delete_matched(Regexp.new(File.dirname(request.path)))
    redirect to(:articles)
  end
end

# ##################################################
# /100daysofcode
# ##################################################
namespace '/100daysofcode' do
  get '' do
    slim markdown(:"100daysofcode")
  end
end
