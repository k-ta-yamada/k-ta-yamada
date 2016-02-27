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

URL_BILLBOARD_RSS = 'http://www.billboard.com/rss/charts/hot-100'.freeze
URL_TEE_LOGGER    = 'https://rubygems.org/api/v1/versions/tee_logger.json'.freeze
URL_TEE_RENC      = 'https://rubygems.org/api/v1/versions/renc.json'.freeze
helpers do
  def restclient_get(uri)
    # TODO: なんかsinatra起動しなくなるのでここでrequire
    require 'rest-client'
    RestClient.get(uri)
  end
end

get '/' do
  slim markdown(:index)
end

get '/readme' do
  slim markdown(:readme)
end

get '/list' do
  slim markdown(:list)
end

UPDATED_AT = Time.now
get '/ping' do
  content_type :json
  { status:     'ok',
    updated_at: UPDATED_AT }.to_json
end

get '/billboard_rss_to_json' do
  content_type :json
  xml = restclient_get(URL_BILLBOARD_RSS)
  Hash.from_xml(xml).to_json
end

get '/gem' do
  @total_dl = {}
  @data     = {}

  tee_logger = JSON.parse(restclient_get(URL_TEE_LOGGER), symbolize_names: true)
  renc       = JSON.parse(restclient_get(URL_TEE_RENC), symbolize_names: true)

  @total_dl[:tee_logger] = tee_logger.map { |v| v[:downloads_count] }.inject(:+)
  @total_dl[:renc]       = renc.map { |v| v[:downloads_count] }.inject(:+)

  data = tee_logger.reverse.map { |v| [v[:number], v[:downloads_count]] }
  @data[:tee_logger] = data.select { |v| v.first.split('.').first.to_i >= 0 }

  data = renc.reverse.map { |v| [v[:number], v[:downloads_count]] }
  @data[:renc] = data.select { |v| v.first.split('.').first.to_i >= 0 }

  slim :gem
end

get '/sitemap.txt' do
  content_type :text
  routes = %w(/ /readme /list /ping /billboard_rss_to_json /gem)
  routes.map { |v| "https://k-ta-yamada.herokuapp.com#{v}" }.join("\n")
end
