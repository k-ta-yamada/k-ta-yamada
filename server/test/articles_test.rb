# frozen_string_literal: true

require_relative './test_helper'

class ArticlesTest < TestBase
  def test_api_articles
    VCR.use_cassette '/articles/articles' do
      get '/api/articles'
      assert last_response.ok?
      assert_equal 'application/json', last_response.media_type
      assert_equal 'SinatraでとりあえずWebアプリを立ち上げてみる',
                   JSON.parse(last_response.body).first['title']
    end
  end

  def test_api_articles_claer_cache
    get '/api/articles/cache-clear'
    assert last_response.ok?
    assert_equal 'text/plain', last_response.media_type
    assert_equal 'done', last_response.body
  end
end
