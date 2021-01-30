# frozen_string_literal: true

require_relative './test_helper'
require 'timecop'

class PlankTest < TestBase
  def test_api_plank
    get '/api/plank'
    assert last_response.ok?
    assert_equal 'application/json', last_response.media_type
  end
end
