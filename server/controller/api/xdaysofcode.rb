# frozen_string_literal: true

XDAYSOFCODE = File.expand_path('../../views/xdaysofcode.md', __dir__)

# /api/xdaysofcode
get '/api/xdaysofcode' do
  md = File.read(XDAYSOFCODE)
  data = markdown(md)
  etag Digest::SHA1.hexdigest(data)
  # TODO: json?
  content_type :json
  json data
end
