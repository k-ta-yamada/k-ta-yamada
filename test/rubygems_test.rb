# frozen_string_literal: true

require_relative './test_helper'

class RubygemsTest < TestBase
  def test_rubygems
    get '/rubygems'
    assert last_response.ok?
    assert(/script.*app.*\.js/.match?(last_response.body))
    assert(/script.*rubygems.*\.js/.match?(last_response.body))
  end

  def test_rubygems_json
    stub_request(:get, 'https://rubygems.org/api/v1/owners/k-ta-yamada/gems.json')
      .to_return(body: File.read('./test/for_webmock/rubygems/gems.json'))

    get '/rubygems.json'
    assert last_response.ok?
    assert_equal 'application/json', last_response.media_type
  end

  def test_rubygems_claer_cache
    get '/rubygems/cache-clear'
    assert last_response.redirect?
  end

  def test_rubygems_renc
    stub_request(:get, 'https://rubygems.org/api/v1/versions/renc.json')
      .to_return(body: File.read('./test/for_webmock/rubygems/renc.json'))

    get '/rubygems/renc'
    assert last_response.ok?
    assert_equal 'application/json', last_response.media_type
  end
end
