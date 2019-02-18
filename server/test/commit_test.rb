# frozen_string_literal: true

require_relative './test_helper'

class CommitTest < TestBase
  def test_api_commit_branches
    # FIXME: failed on travis.
    #      RestClient::Forbidden: 403 Forbidden
    #      ref: https://travis-ci.org/k-ta-yamada/k-ta-yamada/jobs/494906504#L587
    skip
    VCR.use_cassette '/commit/branches' do
      get '/api/commit/branches'
      assert last_response.ok?
      assert_equal 'application/json', last_response.media_type
    end
  end

  def test_api_commit_commits
    # FIXME: failed on travis.
    #      RestClient::Forbidden: 403 Forbidden
    #      ref: https://travis-ci.org/k-ta-yamada/k-ta-yamada/jobs/494906504#L660
    skip
    VCR.use_cassette '/commit/commits?branche=master' do
      get '/api/commit/commits?branche=master'
      assert last_response.ok?
      assert_equal 'application/json', last_response.media_type
    end
  end

  def test_api_commit_claer_cache
    get '/api/commit/cache-clear'
    assert last_response.ok?
    assert_equal 'text/plain', last_response.media_type
    assert_equal 'done', last_response.body
  end
end
