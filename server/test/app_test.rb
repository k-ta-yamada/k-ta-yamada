# frozen_string_literal: true

require_relative './test_helper'

class AppTest < TestBase
  def test_root
    get '/'
    assert last_response.ok?
    assert_equal 'text/html', last_response.media_type
  end

  def test_fallback
    get '/fallback'
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
end
