# frozen_string_literal: true

require_relative './test_helper'

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
    VCR.use_cassette '/articles/articles' do
      get '/articles'
      assert last_response.ok?
      assert_equal 'text/html', last_response.media_type
    end
  end

  def test_articles_claer_cache
    get '/articles/cache-clear'
    assert last_response.redirect?
  end

  def test_100daysofcode
    get '/100daysofcode'
    assert last_response.ok?
    assert_equal 'text/html', last_response.media_type
  end
end
