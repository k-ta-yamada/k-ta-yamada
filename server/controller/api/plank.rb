# frozen_string_literal: true

require_relative './plank/model'

# /api/plank
get '/api/plank' do
  data = Plank.order(Sequel.desc(:date)).all.map(&:disp)

  content_type :json
  json data
end
