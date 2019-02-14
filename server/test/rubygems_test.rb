# frozen_string_literal: true

require_relative './test_helper'

class RubygemsTest < TestBase
  def test_rubygems_json
    VCR.use_cassette '/rubygems/.json' do
      get '/api/rubygems'
      assert last_response.ok?
      assert_equal 'application/json', last_response.media_type
    end
  end

  def test_rubygems_claer_cache
    get '/api/rubygems/cache-clear'
    assert last_response.ok?
    assert_equal 'done', last_response.body
  end

  def test_rubygems_renc
    VCR.use_cassette '/rubygems/renc' do
      get '/api/rubygems/renc'
      assert last_response.ok?
      assert_equal 'application/json', last_response.media_type
    end
  end
end
