require 'bundler'
Bundler.require(:default)
Bundler.require(Sinatra::Base.environment)
require 'json'

use Rack::Deflater

before do
  # request.env.each do |k, v|
  #   puts "  #{k.ljust(25)} => [#{v}]"
  # end if development?
  @path = request.path
end

URL_TEE_LOGGER    = 'https://rubygems.org/api/v1/versions/tee_logger.json'.freeze
URL_RENC          = 'https://rubygems.org/api/v1/versions/renc.json'.freeze
URL_BASE          = 'https://rubygems.org/api/v1/versions'.freeze

helpers do
  def restclient_get(uri)
    # TODO: なんかsinatra起動しなくなるのでここでrequire
    require 'rest-client'
    RestClient.get(uri)
  end

  def to_c3(url)
    json = JSON.parse(restclient_get(url), symbolize_names: true)
    json.sort_by! { |v| v[:number] }
    json.last(10).to_json
  end
end

get '/' do
  slim :prof
  slim markdown(:index)
end

get '/prof' do
  slim :prof
end

get '/rubygems' do
  # json = JSON.parse(restclient_get('https://rubygems.org/api/v1/owners/k-ta-yamada/gems.json'), symbolize_names: true)
  slim :rubygems
end

get '/rubygems.json' do
  json = JSON.parse(restclient_get('https://rubygems.org/api/v1/owners/k-ta-yamada/gems.json'),
                    symbolize_names: true)
  json.to_json
end

get '/rubygems/:gem_name' do |gem_name|
  to_c3("#{URL_BASE}/#{gem_name}.json")
end

get '/gem' do
  @total_dl = {}
  @data     = {}

  tee_logger = JSON.parse(restclient_get(URL_TEE_LOGGER), symbolize_names: true)
  renc       = JSON.parse(restclient_get(URL_RENC), symbolize_names: true)

  @total_dl[:tee_logger] = tee_logger.map { |v| v[:downloads_count] }.inject(:+)
  @total_dl[:renc]       = renc.map { |v| v[:downloads_count] }.inject(:+)

  data = tee_logger.reverse.map { |v| [v[:number], v[:downloads_count]] }
  @data[:tee_logger] = data.select { |v| v.first.split('.').first.to_i >= 0 }

  data = renc.reverse.map { |v| [v[:number], v[:downloads_count]] }
  @data[:renc] = data.select { |v| v.first.split('.').first.to_i >= 0 }

  slim :gem
end

UPDATED_AT = Time.now
get '/ping' do
  content_type :json
  { status:     'ok',
    updated_at: UPDATED_AT }.to_json
end

get '/sitemap.txt' do
  content_type :text
  routes = %w(/ /readme /list /ping /billboard_rss_to_json /gem)
  routes.map { |v| "https://k-ta-yamada.herokuapp.com#{v}" }.join("\n")
end
