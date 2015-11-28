require 'bundler'
Bundler.require(:default)
Bundler.require(Sinatra::Base.environment)
# require './lib/qiita_item'

before do
  # request.env.each do |k, v|
  #   puts "  #{k.ljust(25)} => [#{v}]"
  # end if development?
end

get '/' do
  slim markdown(:index), locals: { path: 'index.md' }
end

get '/readme' do
  slim markdown(:readme), locals: { path: 'README.md' }
end

get '/list' do
  slim markdown(:list), locals: { path: 'list.md' }
end

get '/ping' do
  { status: 'ok' }.to_json
end

# require 'active_support/core_ext/hash/conversions'
require 'open-uri'
require 'json'
BILLBOARD_RSS_URL = 'http://www.billboard.com/rss/charts/hot-100'
get '/billboard_rss_to_json' do
  xml = open(BILLBOARD_RSS_URL).read
  Hash.from_xml(xml).to_json
end
