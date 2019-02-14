# frozen_string_literal: true

require_relative './test_helper'

class XDaysOfCodeTest < TestBase
  def test_api_xdaysofcode
    get '/api/xdaysofcode'
    assert last_response.ok?
    assert_equal 'application/json', last_response.media_type
  end
end
