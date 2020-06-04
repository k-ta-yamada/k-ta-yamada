# frozen_string_literal: true

source 'https://rubygems.org'

ruby '2.7.1'

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

  # Workaround for cc-test-reporter with SimpleCov 0.18.
  # Stop upgrading SimpleCov until the following issue will be resolved.
  # https://github.com/codeclimate/test-reporter/issues/418
  # ref: Code Climate Test ReporterとSimpleCov 0.18で起きるエラーを回避する - koicの日記
  #       https://koic.hatenablog.com/entry/workaround-for-cc-test-reporter-with-simplecov-18
  gem 'simplecov', '~> 0.10', '< 0.18'

  gem 'simplecov-console'
  gem 'timecop'
  gem 'vcr'
  gem 'webmock'
end
