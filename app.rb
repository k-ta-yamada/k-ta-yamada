# frozen_string_literal: true
require 'bundler'
Bundler.require(:default)
Bundler.require(Sinatra::Base.environment)

require 'json'
require 'sinatra/reloader' if settings.development?
require 'sinatra/json'
require 'sinatra/namespace'

use Rack::Deflater
if settings.development?
  use Rack::DevMark::Middleware,
      [:title, Rack::DevMark::Theme::GithubForkRibbon.new(position: 'right')]
  # require 'webrick/https'
  # set :server_settings,
  #     SSLEnable: true,
  #     SSLCertName: [['CN', WEBrick::Utils.getservername]]
end

configure do
  set :logging, settings.development? ? Logger::DEBUG : Logger::INFO
end

MY_DOMAIN = 'k-ta-yamada.me'
before do
  request.env.each { |k, v| logger.debug "  #{k.ljust(25)} => [#{v}]" }
  logger.info "Sinatra::Base.environment: [#{Sinatra::Base.environment}]"
  @path = request.path

  if settings.production?
    unless request.secure?
      redirect to("https://#{request.host_with_port}#{request.path}")
    end

    unless request.host == MY_DOMAIN
      redirect to("https://#{MY_DOMAIN}#{request.path}")
    end
  end
end

# ##################################################
# helpers
# ##################################################
helpers do
  def js(filename)
    basename = File.basename(filename, '.*').to_sym
    name = basename == :layout ? :app : basename
    hash = settings.production? ? JS_HASH : js_hash
    "js/#{name}-#{hash}.js"
  end

  JS_HASH = File.basename(Dir.glob('./public/js/app*.js').first, '.js')
                .split('-').last.freeze

  def js_hash
    File.basename(Dir.glob('./public/js/app*.js').first, '.js')
        .split('-').last
  end

  # for cache
  set :gem_list, nil
  RUBYGEMS_ORG_API = 'https://rubygems.org/api/v1'

  def gem_list
    logger.debug '-' * 50
    logger.debug "settings.gem_list: #{settings.gem_list}"
    uri = "#{RUBYGEMS_ORG_API}/owners/k-ta-yamada/gems.json"
    settings.gem_list ||= JSON.parse(RestClient.get(uri), symbolize_names: true)
  end

  def clear_gem_list
    settings.gem_list = nil
  end

  def gem_versions(gem_name)
    uri = "#{RUBYGEMS_ORG_API}/versions/#{gem_name}.json"
    data = JSON.parse(RestClient.get(uri), symbolize_names: true)
    data.sort_by! { |v| v[:number] }
  end
end

# ##################################################
# /
# ##################################################
namespace '/' do
  get '' do
    slim :index
  end

  UPDATED_AT = Time.now
  get 'ping' do
    content_type :json
    { status:     'ok',
      updated_at: UPDATED_AT }.to_json
  end

  get 'sitemap.txt' do
    content_type :text
    routes = %w[/ /prof /rubygems /repo]
    routes.map { |v| "https://#{MY_DOMAIN}#{v}" }.join("\n")
  end
end

# ##################################################
# /prof
# ##################################################
get '/prof' do
  slim :prof
end

# ##################################################
# /rubygems
# ##################################################
namespace '/rubygems' do
  get '' do
    slim :rubygems
  end

  get '.json' do
    sleep 2
    content_type :json
    json gem_list
  end

  get '/clear-cache' do
    clear_gem_list
    redirect to(:rubygems)
  end

  get '/:gem_name' do |gem_name|
    content_type :json
    json gem_versions(gem_name).last(10)
  end
end

# ##################################################
# /repo
# ##################################################
namespace '/repo' do
  get '' do
    slim :repo
  end

  get '/commits' do
    uri = 'https://api.github.com/repos/k-ta-yamada/k-ta-yamada/commits'
    branche = params[:branche]
    param = "?sha=#{branche}"
    json = JSON.parse(RestClient.get("#{uri}#{param}"), symbolize_names: true)

    content_type :json
    json json
  end

  get '/branches' do
    uri = 'https://api.github.com/repos/k-ta-yamada/k-ta-yamada/branches'
    json = JSON.parse(RestClient.get(uri), symbolize_names: true)

    content_type :json
    json json
  end
end

namespace '/30day_plank_challenge' do
  START_DAY = Date.new(2018, 10, 23)
  RESULT_FILE_NAME = '30day_plank_challenge.result'

  helpers do
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
      START_DAY + day - 1 == Date.today
    end

    def calc_date(day)
      date = START_DAY + day - 1
      mm = format('%02d', date.mon)
      dd = format('%02d', date.day)
      wday = %w[sun mon tue wed thu fri sat][date.wday]
      "#{mm}/#{dd} #{wday}"
    end
  end

  A = Struct.new(:task, :result)

  get '' do
    def to_i_to_sym(task, result)
      [task.to_i.zero? ? task.to_sym : task.to_i,
       result.nil? ? nil : result.to_i]
    end

    def decorate(task, result)
      [task.is_a?(Numeric) ? "#{task} sec" : task,
       result.is_a?(Numeric) ? "#{result} sec" : result]
    end

    @list = File.readlines(RESULT_FILE_NAME).map(&:split)
                .map { |a, b| to_i_to_sym(a, b) }
                .map { |a, b| decorate(a, b) }
                .map { |v| A.new(*v) }

    slim :"30day_plank_challenge"
  end
end
