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

require 'rack/test'
require 'pry'
require './app.rb'

class TestBase < Minitest::Test
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end
end

class AppTest < TestBase
  def test_root
    get '/'
    assert last_response.ok?
    assert_equal 'text/html', last_response.media_type
  end

  def test_ping
    get '/ping'
    assert last_response.ok?
    assert_equal 'application/json', last_response.media_type
  end

  def test_sitemap_txt
    get '/sitemap.txt'
    assert last_response.ok?
    assert_equal 'text/plain', last_response.media_type
  end

  def test_prof
    get '/prof'
    assert last_response.ok?
    assert_equal 'text/html', last_response.media_type
  end

  def test_30day_plank_challenge
    get '/30day_plank_challenge'
    assert last_response.ok?
    assert_equal 'text/html', last_response.media_type
  end

  def test_articles
    get '/articles'
    assert last_response.ok?
    assert_equal 'text/html', last_response.media_type
  end
end

class AppRubygemsTest < TestBase
  def test_rubygems
    get '/rubygems'
    assert last_response.ok?
    assert(/script.*app.*\.js/.match?(last_response.body))
    assert(/script.*rubygems.*\.js/.match?(last_response.body))
  end

  def test_rubygems_json
    get '/rubygems.json'
    assert last_response.ok?
    assert_equal 'application/json', last_response.media_type
  end

  def test_rubygems_claer_cache
    get '/rubygems/clear-cache'
    assert last_response.redirect?
  end

  def test_rubygems_renc
    get '/rubygems/renc'
    assert last_response.ok?
    assert_equal 'application/json', last_response.media_type
  end
end

class AppRepoTest < TestBase
  def test_repo
    get '/repo'
    assert last_response.ok?
    assert(/script.*app.*\.js/.match?(last_response.body))
    assert(/script.*repo.*\.js/.match?(last_response.body))
  end

  def test_repo_branches
    get '/repo/branches'
    assert last_response.ok?
    assert_equal 'application/json', last_response.media_type
  end

  def test_repo_commits
    get '/repo/commits?branche=master'
    assert last_response.ok?
    assert_equal 'application/json', last_response.media_type
  end

  def test_repo_claer_cache
    get '/repo/clear-cache'
    assert last_response.redirect?
  end
end
