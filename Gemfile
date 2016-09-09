source 'https://rubygems.org'

ruby '2.3.1'

gem 'sinatra'
gem 'sinatra-contrib'

gem 'slim'
# gem 'redcarpet'
gem 'kramdown'
gem 'rest-client'

# gem 'activesupport', require: false
gem 'activesupport', require: 'active_support/all'

if RUBY_PLATFORM == 'x64-mingw32'
  gem 'pg', '>= 0.19.0.beta', require: true
else
  gem 'pg', require: true
end
gem 'sequel', require: true
gem 'tee_logger', require: true
gem "rack-dev-mark"

group :production do
  gem 'newrelic_rpm'
end

group :development do
  gem 'pry'
  gem 'pry-doc'
  gem 'pry-theme'
  gem 'awesome_print'
end
