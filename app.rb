require 'sinatra'
require 'redcarpet'
require 'net/https'
require 'json'
# require 'sinatra/json'
# require 'mongo'
if development?
  require 'sinatra/reloader'
  require 'pry'
  require 'pry-doc'
  require 'byebug'
end

get '/' do
  erb markdown(:index)
end

get '/readme' do
  erb markdown(:readme)
end

get '/qiita_items' do
  https = Net::HTTP.new('qiita.com', '443')
  https.use_ssl = true
  https.start do |http|
    res = http.get('/api/v1/users/k-ta-yamada/items')
    items = JSON.parse(res.body, { symbolize_names: true })
    limit = res.to_hash['x-ratelimit-limit']
    remaining = res.to_hash['x-ratelimit-remaining']

    erb :qiita_items, locals: { items: items, remaining: remaining, limit: limit }
  end
end

get '*' do
  erb markdown(:dummy)
end
