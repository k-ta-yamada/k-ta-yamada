# frozen_string_literal: true

ENV['RACK_ENV'] = 'test'

require 'simplecov'
require 'simplecov-console'
# SimpleCov.formatter = SimpleCov::Formatter::Console
formatters = [
  SimpleCov::Formatter::HTMLFormatter,
  SimpleCov::Formatter::Console
]
SimpleCov.formatter = SimpleCov::Formatter::MultiFormatter.new(formatters)
SimpleCov.start do
  coverage_dir 'test/coverage'
end

require 'minitest/autorun'
require 'minitest/reporters'
Minitest::Reporters.use! [
  # Minitest::Reporters::ProgressReporter.new,
  Minitest::Reporters::SpecReporter.new,
  Minitest::Reporters::HtmlReporter.new
]

require 'webmock/minitest'
# WebMock.allow_net_connect!

require 'rack/test'
require 'pry'
require './app.rb'

class TestBase < Minitest::Test
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end
end
