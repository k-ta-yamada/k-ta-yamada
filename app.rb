require 'bundler'
Bundler.require
require 'net/https'
require 'sinatra/reloader' if development?
require './lib/qiita_item'

configure :production do
  require 'newrelic_rpm'
end

get '/' do
  erb markdown(:index)
end

get '/readme' do
  erb markdown(:readme)
end

get '/qiita_items' do
  locals = { items: QiitaItem.result_cache,
             remaining: QiitaItem.ratelimit_remaining,
             limit: QiitaItem.ratelimit_limit }
  erb :qiita_items, locals: locals
end

get '*' do
  erb markdown(:dummy)
end
