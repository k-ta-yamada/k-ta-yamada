# frozen_string_literal: true

module RepoHelper
  GITHUB_API = 'https://api.github.com/repos/k-ta-yamada/k-ta-yamada'
  CACHE_EXPIRATION = 60 * 5

  @branches = nil
  @commits = {}

  class << self
    attr_accessor :branches, :commits
  end

  def branches
    return RepoHelper.branches if RepoHelper.branches

    logger.info '#logging update cache: branches'
    uri = "#{GITHUB_API}/branches"
    data = JSON.parse(RestClient.get(uri), symbolize_names: true)
    RepoHelper.branches = data
  end

  def commits(branche)
    commits = commits_by(branche)
    elapsed_time = Time.now - (commits ? commits[:updated_at] : Time.now)
    return commits[:data] if commits[:data] && elapsed_time < CACHE_EXPIRATION

    logger.info "#logging update cache: commits(#{branche})"
    uri = "#{GITHUB_API}/commits?sha=#{branche}"
    data = JSON.parse(RestClient.get(uri), symbolize_names: true)

    RepoHelper.commits[branche] = { data: data, updated_at: Time.now }
    data
  end

  def clear_repo_cache
    RepoHelper.branches = nil
    RepoHelper.commits  = {}
  end

  # private
  def commits_by(branche)
    RepoHelper.commits[branche] || { data: nil, updated_at: Time.now }
  end
end
