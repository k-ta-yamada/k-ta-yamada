source 'https://rubygems.org'

ruby '2.5.1'

gem 'sinatra'
gem 'sinatra-contrib'

gem 'slim'
# gem 'redcarpet'
gem 'kramdown'
gem 'rest-client'

# gem 'activesupport', require: false
gem 'activesupport', require: 'active_support/all'

# gem 'pg', require: true
# gem 'sequel', require: true
gem 'tee_logger', require: true
gem 'rack-dev-mark'

group :production do
  gem 'newrelic_rpm'
end

group :development do
  gem 'rubocop'
  gem 'pry'
  gem 'pry-doc'
  gem 'pry-theme'
  gem 'awesome_print'
end
