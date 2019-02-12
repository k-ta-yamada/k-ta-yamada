# frozen_string_literal: true

require_relative './test_helper'

class RepoTest < TestBase
  def test_repo
    skip
    get '/repo'
    assert last_response.ok?
    assert(/script.*app.*\.js/.match?(last_response.body))
    assert(/script.*repo.*\.js/.match?(last_response.body))
  end

  def test_repo_branches
    skip
    VCR.use_cassette '/repo/branches' do
      get '/repo/branches'
      assert last_response.ok?
      assert_equal 'application/json', last_response.media_type
    end
  end

  def test_repo_commits
    skip
    VCR.use_cassette '/repo/commits?branche=master' do
      get '/repo/commits?branche=master'
      assert last_response.ok?
      assert_equal 'application/json', last_response.media_type
    end
  end

  def test_repo_claer_cache
    skip
    get '/repo/cache-clear'
    assert last_response.redirect?
  end
end
