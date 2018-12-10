# frozen_string_literal: true

module RubygemsHelper
  CACHE_EXPIRATION = 60 * 5

  @gem_list = nil
  @gem_versions = {}
  @last_update = Time.now

  class << self
    attr_accessor :gem_list, :gem_versions, :last_update
  end

  def gem_list
    gem_cache_clear if gem_cache_expire?

    return RubygemsHelper.gem_list if RubygemsHelper.gem_list

    logger.info '#logging update cache: gem_list'
    RubygemsHelper.gem_list = Gems.gems('k-ta-yamada')
  end

  def gem_versions(name)
    gem_cache_clear if gem_cache_expire?

    version = RubygemsHelper.gem_versions[name]
    return version if version

    logger.info "#logging update cache: gem_versions(#{name})"
    RubygemsHelper.gem_versions[name] =
      Gems.versions(name).sort_by { |v| v['number'] }
  end

  def gem_cache_clear
    RubygemsHelper.gem_list = nil
    RubygemsHelper.gem_versions = {}
    RubygemsHelper.last_update = Time.now
  end

  # private
  def gem_cache_expire?
    elapsed_time = Time.now - RubygemsHelper.last_update
    elapsed_time > CACHE_EXPIRATION
  end
end
