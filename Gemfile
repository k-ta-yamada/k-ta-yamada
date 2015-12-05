source 'https://rubygems.org'

ruby '2.1.5'

gem 'sinatra'

gem 'slim'
# gem 'redcarpet'
gem 'kramdown'

gem 'chartkick'

gem 'rest-client', require: false

# gem 'activesupport', require: false
gem 'activesupport', require: 'active_support/core_ext/hash/conversions'

group :production do
  gem 'newrelic_rpm'
end

group :development do
  gem 'sinatra-contrib', require: 'sinatra/reloader'
  gem 'pry'
  gem 'pry-doc'
  gem 'pry-theme'
end
