# frozen_string_literal: true

require 'sequel'

DATABASE_URL = ENV['DATABASE_URL'] || 'postgres://localhost'
DB           = Sequel.connect(DATABASE_URL)

puts "--     __FILE__: [#{__FILE__}]"
# puts "-- DATABASE_URL: [#{DATABASE_URL}]" if settings.development?
puts "--           DB: [#{DB}]"
