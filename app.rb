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

get '/ping' do
  { status: 'ok' }.to_json
end
