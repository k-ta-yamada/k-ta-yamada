class QiitaItem
  require 'net/https'
  require 'json'

  # 指定秒数以下かのチェックで使用する秒数を指定
  SPECIFIED_TIME = 3600

  @result_cache = []
  @last_update = Time.now
  @ratelimit_limit = 0
  @ratelimit_remaining = 0

  class << self
    # @return [Array-of-Hash]
    def reloading_items # rubocop:disable Metrics/MethodLength
      return @result_cache if use_result_of_previous?

      @result_cache = []
      https = Net::HTTP.new('qiita.com', '443')
      https.use_ssl = true
      https.start do |http|
        res = http.get('/api/v1/users/k-ta-yamada/items')
        # items = JSON.parse(res.body, { symbolize_names: true })
        @result_cache = JSON.parse(res.body, symbolize_names: true)
        @ratelimit_limit = res.to_hash['x-ratelimit-limit']
        @ratelimit_remaining = res.to_hash['x-ratelimit-remaining']
      end
      @last_update = Time.now
      @result_cache
    end

    # クラスインスタンス変数の@result_cacheを返す
    # @result_cacheがnilの場合はreloading_itemsを実行
    # @return [Array-of-Hash]
    # @note rubocopでattr_readerへの変更を警告されるが
    #       クラスインスタンス変数を使用したいためにわざとやってる
    def result_cache        # rubocop:disable Style/TrivialAccessors
      reloading_items if @result_cache.empty?
      @result_cache
    end

    # クラスインスタンス変数の@last_updateを返す
    # @return [Time]
    # @note rubocopでattr_readerへの変更を警告されるが
    #       クラスインスタンス変数を使用したいためにわざとやってる
    def last_update         # rubocop:disable Style/TrivialAccessors
      @last_update
    end

    def ratelimit_limit     # rubocop:disable Style/TrivialAccessors
      @ratelimit_limit
    end

    def ratelimit_remaining # rubocop:disable Style/TrivialAccessors
      @ratelimit_remaining
    end

    private

    # 前回処理時間から指定時間以下かつ、@result_cacheが空でない場合はtrue
    # @return [Boolean]
    def use_result_of_previous?
      within_specified_seconds? && !@result_cache.empty?
    end

    # 前回実行時間現在までの秒数が指定の秒数以下かどうかを返す
    # @return [Boolean]
    #   true  : 指定秒数以下
    #   false : 指定秒数以上
    def within_specified_seconds?
      SPECIFIED_TIME > (Time.now - @last_update)
    end
  end
end
