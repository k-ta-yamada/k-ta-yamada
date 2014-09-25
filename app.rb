require 'sinatra'
require 'redcarpet'
require 'net/https'
require 'json'
require './lib/qiita_item'
# require 'sinatra/json'
# require 'mongo'
if development?
  require 'sinatra/reloader'
  require 'pry'
  require 'pry-doc'
  require 'byebug'
end

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
  erb :qiita_items,
      locals: { items: QiitaItem.result_cache,
                remaining: QiitaItem.ratelimit_remaining,
                limit: QiitaItem.ratelimit_limit }
end

get '*' do
  erb markdown(:dummy)
end
