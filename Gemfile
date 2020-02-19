# frozen_string_literal: true

source 'https://rubygems.org'

ruby '2.7.0'

gem 'sinatra'
gem 'sinatra-contrib'

gem 'slim'
# gem 'redcarpet'
gem 'gems'
gem 'kramdown'
gem 'rest-client'

# gem 'activesupport', require: false
gem 'activesupport', require: 'active_support/all'

# gem 'pg', require: true
# gem 'sequel', require: true
gem 'rack-dev-mark'
gem 'tee_logger', require: true

group :production do
  gem 'newrelic_rpm'
  gem 'puma'
end

group :development do
  gem 'awesome_print'
  gem 'debase'
  gem 'pry'
  gem 'pry-doc'
  gem 'pry-theme'
  gem 'rubocop'
  gem 'ruby-debug-ide'
end

group :test do
  gem 'minitest-reporters'
  gem 'rack-test'
  gem 'rake'
  gem 'simplecov'
  gem 'simplecov-console'
  gem 'timecop'
  gem 'vcr'
  gem 'webmock'
end
