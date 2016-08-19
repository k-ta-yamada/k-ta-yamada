require 'bundler'
Bundler.require(:default)
Bundler.require(Sinatra::Base.environment)

require 'sinatra/reloader'
require 'sinatra/json'
require 'sinatra/namespace'

use Rack::Deflater

before do
  # request.env.each do |k, v|
  #   puts "  #{k.ljust(25)} => [#{v}]"
  # end if development?
  puts Sinatra::Base.environment
  @path = request.path
end

# ##################################################
# /
# ##################################################
get '/' do
  slim markdown(:index)
end

# ##################################################
# /prof
# ##################################################
get '/prof' do
  slim :prof
end

# ##################################################
# /rubygems
# ##################################################
RUBYGEMS_ORG       = 'https://rubygems.org/api/v1'.freeze
namespace '/rubygems' do
  get '' do
    slim :rubygems
  end

  get '.json' do
    content_type :json
    uri = "#{RUBYGEMS_ORG}/owners/k-ta-yamada/gems.json"
    data = JSON.parse(RestClient.get(uri), symbolize_names: true)
    json data
  end

  get '/:gem_name' do |gem_name|
    content_type :json
    uri = "#{RUBYGEMS_ORG}/versions/#{gem_name}.json"
    data = JSON.parse(RestClient.get(uri), symbolize_names: true)
    data.sort_by! { |v| v[:number] }
    json data.last(10)
  end
end

# ##################################################
# others
# ##################################################
namespace '/' do
  get 'gem' do
    @total_dl = {}
    @data     = {}

    uri = "#{RUBYGEMS_ORG}/versions/tee_logger.json"
    tee_logger = JSON.parse(RestClient.get(uri), symbolize_names: true)
    uri = "#{RUBYGEMS_ORG}/versions/renc.json"
    renc       = JSON.parse(RestClient.get(uri), symbolize_names: true)

    @total_dl[:tee_logger] = tee_logger.map { |v| v[:downloads_count] }.inject(:+)
    @total_dl[:renc]       = renc.map { |v| v[:downloads_count] }.inject(:+)

    data = tee_logger.reverse.map { |v| [v[:number], v[:downloads_count]] }
    @data[:tee_logger] = data.select { |v| v.first.split('.').first.to_i >= 0 }

    data = renc.reverse.map { |v| [v[:number], v[:downloads_count]] }
    @data[:renc] = data.select { |v| v.first.split('.').first.to_i >= 0 }

    slim :gem
  end

  UPDATED_AT = Time.now
  get 'ping' do
    content_type :json
    { status:     'ok',
      updated_at: UPDATED_AT }.to_json
  end

  get 'sitemap.txt' do
    content_type :text
    routes = %w(/ /prof /rubygems /ping /gem)
    routes.map { |v| "https://k-ta-yamada.herokuapp.com#{v}" }.join("\n")
  end
end
