# frozen_string_literal: true

module RubygemsHelper
  RUBYGEMS_ORG_API = 'https://rubygems.org/api/v1'
  CACHE_EXPIRATION = 60 * 5

  @gem_list = nil
  @gem_versions = {}

  class << self
    attr_accessor :gem_list, :gem_versions
  end

  def gem_list
    return RubygemsHelper.gem_list if RubygemsHelper.gem_list

    logger.info '#logging update cache: gem_list'
    uri = "#{RUBYGEMS_ORG_API}/owners/k-ta-yamada/gems.json"
    data = JSON.parse(RestClient.get(uri), symbolize_names: true)
    RubygemsHelper.gem_list = data
  end

  def gem_versions(name)
    version = gem_versions_by(name)
    elapsed_time = Time.now - (version ? version[:updated_at] : Time.now)
    return version[:data] if version[:data] && elapsed_time < CACHE_EXPIRATION

    logger.info "#logging update cache: gem_versions(#{name})"
    data = api_request("#{RUBYGEMS_ORG_API}/versions/#{name}.json")
    RubygemsHelper.gem_versions[name] = { data: data, updated_at: Time.now }
    data
  end

  def clear_gem_cache
    RubygemsHelper.gem_list = nil
    RubygemsHelper.gem_versions = {}
  end

  # private
  def gem_versions_by(name)
    RubygemsHelper.gem_versions[name] || { data: nil, updated_at: Time.now }
  end

  # private
  def api_request(uri)
    data = JSON.parse(RestClient.get(uri), symbolize_names: true)
    data.sort_by! { |v| v[:number] }
    data
  end
end
