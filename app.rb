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

URL_BILLBOARD_RSS = 'http://www.billboard.com/rss/charts/hot-100'
URL_TEE_LOGGER    = 'https://rubygems.org/api/v1/versions/tee_logger.json'
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
  hash = JSON.parse(restclient_get(URL_TEE_LOGGER), symbolize_names: true)
  @total_dl = hash.map { |v| v[:downloads_count] }.inject(:+)

  @data = hash.reverse.map { |v| [v[:number], v[:downloads_count]] }
  @data.select! { |v| v.first.split('.').first.to_i >= 2 }

  slim :chart
end

get '/sitemap.txt' do
  content_type :text
  routes = %w(/ /readme /list /ping /billboard_rss_to_json /gem)
  routes.map { |v| "https://k-ta-yamada.herokuapp.com#{v}" }.join("\n")
end

__END__
@@chart
script src="//www.google.com/jsapi"
script src="chartkick.js"
p :a href='https://rubygems.org/gems/tee_logger' target='new' tee_logger
p total download count [#{@total_dl}]
p download count by verions (latest 10)
== column_chart @data.last(10)
/ == line_chart [{ name: 'data_num', data: @data_num }, { name: 'data_cnt', data: @data_cnt }]
/ == line_chart @data_cnt
p :a href='http://bestgems.org/gems/tee_logger' target='new' tee_logger -- BestGems
