# frozen_string_literal: true

module RepoHelper
  GITHUB_API = 'https://api.github.com/repos/k-ta-yamada/k-ta-yamada'
  CACHE_EXPIRATION = 60 * 5

  @branches = nil
  @commits = {}
  @last_update = Time.now

  class << self
    attr_accessor :branches, :commits, :last_update
  end

  def repo_branches
    repo_cache_clear if repo_cache_expire?

    return RepoHelper.branches if RepoHelper.branches

    logger.info '#logging update cache: branches'
    RepoHelper.branches = JSON.parse(RestClient.get("#{GITHUB_API}/branches"))
  end

  def repo_commits(branche)
    repo_cache_clear if repo_cache_expire?

    commit = RepoHelper.commits[branche]
    return commit if commit

    logger.info "#logging update cache: commits(#{branche})"
    RepoHelper.commits[branche] =
      JSON.parse(RestClient.get("#{GITHUB_API}/commits?sha=#{branche}"))
  end

  def repo_cache_clear
    RepoHelper.branches = nil
    RepoHelper.commits = {}
    RepoHelper.last_update = Time.now
  end

  # private
  def repo_cache_expire?
    elapsed_time = Time.now - RepoHelper.last_update
    elapsed_time > CACHE_EXPIRATION
  end
end
