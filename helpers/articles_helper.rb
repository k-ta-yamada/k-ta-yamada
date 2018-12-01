# frozen_string_literal: true

module ArticlesHelper
  QIITA_API = 'https://qiita.com/api/v2/authenticated_user/items'
  QIITA_API_TOKEN = ENV['QIITA_API_TOKEN']
  CACHE_EXPIRATION = ENV['CACHE_EXPIRATION'] || 60 * 5

  @total_count = nil
  @articles = nil
  @last_update = Time.now

  class << self
    attr_accessor :total_count, :articles, :last_update
  end

  def articles
    return articles_dummy_data if QIITA_API_TOKEN.nil?

    articles_cache_expire?
    if ArticlesHelper.articles.nil?
      url = "#{QIITA_API}?per_page=#{articles_total_count}"
      headers = { authorization: "Bearer #{QIITA_API_TOKEN}" }
      res = RestClient.get(url, headers)
      ArticlesHelper.articles = JSON.parse(res)
    end
    ArticlesHelper.articles
  end

  def articles_total_count
    if ArticlesHelper.total_count.nil?
      url = QIITA_API
      headers = { authorization: "Bearer #{QIITA_API_TOKEN}" }
      res = RestClient.get(url, headers)
      ArticlesHelper.total_count = res.headers[:total_count].to_i
    end
    ArticlesHelper.total_count
  end

  # private
  def articles_cache_expire?
    ArticlesHelper.last_update ||= Time.now
    elapsed_time = Time.now - ArticlesHelper.last_update
    expire = elapsed_time > CACHE_EXPIRATION
    return unless expire

    ArticlesHelper.total_count = nil
    ArticlesHelper.articles    = nil
    ArticlesHelper.last_update = Time.now
  end

  # privte
  def articles_dummy_data # rubocop:disable Metrics/MethodLength
    [
      {
        'title' => 'dummy data 1',
        'url' => 'https://example.com',
        'tags' => [{ 'name' => 'dummy1' }, { 'name' => 'dummy2' }],
        'created_at' => '2018-11-30T12:00:00+09:00',
        'updated_at' => '2018-11-30T12:00:00+09:00',
        'likes_count' => 0
      },
      {
        'title' => 'dummy data 2',
        'url' => 'https://example.com',
        'tags' => [{ 'name' => 'dummy1' }, { 'name' => 'dummy2' }],
        'created_at' => '2018-11-30T12:10:00+09:00',
        'updated_at' => '2018-11-30T12:10:00+09:00',
        'likes_count' => 2
      }
    ]
  end
end
