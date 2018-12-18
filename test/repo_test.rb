# frozen_string_literal: true

require_relative './test_helper'

class RepoTest < TestBase
  def test_repo
    get '/repo'
    assert last_response.ok?
    assert(/script.*app.*\.js/.match?(last_response.body))
    assert(/script.*repo.*\.js/.match?(last_response.body))
  end

  def test_repo_branches
    stub_request(:get, 'https://api.github.com/repos/k-ta-yamada/k-ta-yamada/branches')
      .to_return(body: File.read('./test/for_webmock/repo/branches.json'))

    get '/repo/branches'
    assert last_response.ok?
    assert_equal 'application/json', last_response.media_type
  end

  def test_repo_commits
    stub_request(:get, 'https://api.github.com/repos/k-ta-yamada/k-ta-yamada/commits?sha=master')
      .to_return(body: File.read('./test/for_webmock/repo/commits_master.json'))

    get '/repo/commits?branche=master'
    assert last_response.ok?
    assert_equal 'application/json', last_response.media_type
  end

  def test_repo_claer_cache
    get '/repo/cache-clear'
    assert last_response.redirect?
  end
end
