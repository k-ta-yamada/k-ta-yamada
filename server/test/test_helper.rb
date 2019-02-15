# frozen_string_literal: true

ENV['RACK_ENV'] = 'test'

require 'simplecov'
require 'simplecov-console'
# SimpleCov.formatter = SimpleCov::Formatter::Console
formatters = [SimpleCov::Formatter::HTMLFormatter,
              SimpleCov::Formatter::Console]
SimpleCov.formatter = SimpleCov::Formatter::MultiFormatter.new(formatters)
SimpleCov.start

require 'minitest/autorun'
require 'minitest/reporters'
reporters = [
  Minitest::Reporters::SpecReporter.new,
  # Minitest::Reporters::ProgressReporter.new,
  # Minitest::Reporters::HtmlReporter.new
]
Minitest::Reporters.use!(reporters)

# require 'webmock/minitest'
# WebMock.allow_net_connect!

require 'vcr'
VCR.configure do |c|
  c.cassette_library_dir = '../test/vcr'
  c.hook_into :webmock
end

require 'rack/test'
require 'pry'
require './app.rb'

class TestBase < Minitest::Test
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end
end
