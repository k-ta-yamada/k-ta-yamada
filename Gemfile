source 'https://rubygems.org'

ruby '2.5.1'

gem 'sinatra'
gem 'sinatra-contrib'

gem 'slim'
# gem 'redcarpet'
gem 'kramdown'
gem 'rest-client'
gem 'gems'

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
  gem 'ruby-debug-ide'
  gem 'debase'
  gem 'rubocop'
  gem 'pry'
  gem 'pry-doc'
  gem 'pry-theme'
  gem 'awesome_print'
end

group :production do
  gem 'puma'
end

group :test do
  gem "rake"
  gem "minitest-reporters"
  gem "rack-test"
  gem "simplecov"
  gem "simplecov-console"
  gem "webmock"
end
