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
                    max_connections: 10,
                    logger: TeeLogger.new('db.log'))
TABLE_NAME = :files
FILES = DB[TABLE_NAME]
LIMIT = 5
namespace '/sample' do
  namespace '/img_upload' do
    get '' do
      unless DB.table_exists?(TABLE_NAME)
        DB.create_table(TABLE_NAME) do
          primary_key :id
          String      :message
          String      :filename
          String      :type
          Bignum      :size
          File        :file
          DateTime    :created_at
        end
      end

      # @msg = params[:msg]
      # @files = FILES
      #          .select(:id, :message, :filename, :type, :size, :created_at)
      #          .order(Sequel.desc(:id))
      #          .map { |r| OpenStruct.new(r) }
      slim :img_upload
    end

    get '/list' do
      @files = FILES
               .select(:id, :message, :filename, :type, :size, :created_at)
               .order(Sequel.desc(:id))
      @files.all.to_json
    end

    post '' do
      # auth
      if params[:pass].blank? || params[:pass] != ENV['APP_PASS']
        redirect to("#{@path}?msg=access_forbidden")
      end unless settings.development?

      # attached?
      halt 400, 'attached nothing' if Array(params[:files]).empty?

      files = params[:files].map do |file|
        # filename, type, _name, tempfile, _head = params[:file].values
        filename, type, _name, tempfile, _head = file.values

        # not allowed file type
        halt 400, 'not allowed type of image' unless type =~ %r{^image/.*}
        # size over
        halt 400, 'file size over' if tempfile.size > 1.megabyte

        { filename: filename, type: type, tempfile: tempfile }
      end

      # TODO: change to  bulk insert!
      files.each do |file|
        FILES << { filename:   file[:filename],
                   message:    params[:message],
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
# others
# ##################################################
namespace '/' do
  get 'gem' do
    @total_dl = {}
    @data     = {}

    uri = "#{RUBYGEMS_ORG_API}/versions/tee_logger.json"
    tee_logger = JSON.parse(RestClient.get(uri), symbolize_names: true)
    uri = "#{RUBYGEMS_ORG_API}/versions/renc.json"
    renc = JSON.parse(RestClient.get(uri), symbolize_names: true)

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
