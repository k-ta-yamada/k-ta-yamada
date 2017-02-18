# frozen_string_literal: true
require 'bundler'
Bundler.require(:default)
Bundler.require(Sinatra::Base.environment)

require 'json'
require 'sinatra/reloader'
require 'sinatra/json'
require 'sinatra/namespace'

use Rack::Deflater
if settings.development?
  use Rack::DevMark::Middleware,
      [:title, Rack::DevMark::Theme::GithubForkRibbon.new(position: 'right')]
end

configure do
  _loglevel = settings.development? ? Logger::DEBUG : Logger::INFO
  set :logging, settings.development? ? Logger::DEBUG : Logger::INFO
end

before do
  request.env.each do |k, v|
    # logger.debug "  #{k.ljust(25)} => [#{v}]"
  end

  logger.info "Sinatra::Base.environment: #{Sinatra::Base.environment}"
  @path = request.path
end

# ##################################################
# img_upload
# ##################################################
DATABASE_URL =
  ENV['DATABASE_URL'] || 'postgres://postgres:postgres@localhost:5432/test'
DB = Sequel.connect(DATABASE_URL,
                    max_connections: 10)
                    # logger: TeeLogger.new('log/db.log'))
TABLE_NAME = :files
FILES = DB[TABLE_NAME]
LIMIT = 20
namespace '/sample' do
  namespace '/img_upload' do
    helpers do
      def create_table
        DB.create_table(TABLE_NAME) do
          primary_key :id
          String      :message
          String      :memo
          String      :filename
          String      :type
          Bignum      :size
          File        :file
          DateTime    :created_at
        end
      end

      def auth?
        if params[:pass].blank? || params[:pass] != ENV['APP_PASS']
          halt 403, 'access forbidden'
        end
      end

      def attached?
        halt 400, 'attached nothing' if Array(params[:files]).empty?
      end

      def allowed_type?(type)
        halt 400, 'not allowed type of image' unless type =~ %r{^image/.*}
      end

      def size_over?(size)
        halt 400, 'file size over' if size > 1.megabyte
      end
    end

    get '' do
      create_table unless DB.table_exists?(TABLE_NAME)
      slim :img_upload
    end

    get '/list' do
      files = FILES
              .select(:id, :message, :memo, :filename, :type, :size, :created_at)
              .order(Sequel.desc(:id))
      files.map { |r| r.merge( size_human: r[:size].to_s(:human_size) ) }.to_json
    end

    post '' do
      # auth
      auth? unless settings.development?
      attached?

      files = params[:files].map do |file|
        filename, type, _name, tempfile, _head = file.values
        allowed_type?(type)
        size_over?(tempfile.size)
        { filename: filename, type: type, tempfile: tempfile }
      end

      # TODO: change to  bulk insert!
      files.each do |file|
        FILES << { filename:   file[:filename],
                   message:    params[:message],
                   memo:       params[:memo],
                   type:       file[:type],
                   size:       file[:tempfile].size,
                   file:       Sequel.blob(file[:tempfile].read),
                   created_at: Time.now }
      end

      if FILES.count > LIMIT
        threshold = FILES.select(:id)
                         .order(Sequel.desc(:id))
                         .limit(LIMIT)
                         .map(&:values)
                         .min
        FILES.where('id < ?', threshold).delete
      end
      # redirect to(@path)
      status 200
    end

    delete '/*' do |id|
      delete_num = FILES.where(id: id).delete
      { id: id, delete_num: delete_num }.to_json
    end

    get %r{\/(\d*)} do |id|
      row = FILES.where(id: id).first
      not_found if row.nil?

      content_type row[:type]
      row[:file]
    end

    get %r{\/dl/(\d*)} do |id|
      row = FILES.where(id: id).first
      not_found if row.nil?

      content_type row[:type]
      attachment row[:filename]
      row[:file]
    end

    get '/drop' do
      DB.drop_table?(TABLE_NAME, cascade: true)
      redirect to('sample/img_upload')
    end
  end
end

# ##################################################
# helpers
# ##################################################
helpers do
  # for cache
  set :gem_list, nil
  RUBYGEMS_ORG_API = 'https://rubygems.org/api/v1'

  def gem_list
    logger.debug '-' * 50
    logger.debug "settings.gem_list: #{settings.gem_list}"
    uri = "#{RUBYGEMS_ORG_API}/owners/k-ta-yamada/gems.json"
    settings.gem_list ||= JSON.parse(RestClient.get(uri), symbolize_names: true)
  end

  def clear_gem_list
    settings.gem_list = nil
  end

  def gem_versions(gem_name)
    uri = "#{RUBYGEMS_ORG_API}/versions/#{gem_name}.json"
    data = JSON.parse(RestClient.get(uri), symbolize_names: true)
    data.sort_by! { |v| v[:number] }
  end
end

# ##################################################
# /
# ##################################################
namespace '/' do
  get '' do
    slim :index
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

# ##################################################
# /prof
# ##################################################
get '/prof' do
  slim :prof
end

# ##################################################
# /rubygems
# ##################################################
namespace '/rubygems' do
  get '' do
    slim :rubygems
  end

  get '.json' do
    content_type :json
    json gem_list
  end

  get '/clear-cache' do
    clear_gem_list
    redirect to(:rubygems)
  end

  get '/:gem_name' do |gem_name|
    content_type :json
    json gem_versions(gem_name).last(10)
  end
end

# ##################################################
# /repo
# ##################################################
namespace '/repo' do
  get '/commits' do
    uri = "https://api.github.com/repos/k-ta-yamada/k-ta-yamada/commits"
    @data = JSON.parse(RestClient.get(uri), symbolize_names: true)
    slim :commits
  end
end
