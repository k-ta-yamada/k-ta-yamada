# frozen_string_literal: true

if DB.table_exists?(:plank)
  puts '-- create bk'
  DB.create_table!(:bk, as: DB[:plank])
end

DB.create_table!(:plank) do
  Integer :id
  String  :task
  String  :result
  Date    :date
end

TABLE = DB[:plank]

if DB.table_exists?(:bk)
  puts '-- copy from bk'
  TABLE.insert(TABLE.columns, DB[:bk])
end

if TABLE.count.zero? || ENV['INITIAL_LOAD']
  puts '-- INITIAL_LOAD !!'

  filename = File.expand_path('../../../views/xdays_plank_challenge.txt', __dir__)

  value = File.readlines(filename)
              .map(&:split)
              .map.with_index(1) { |(task, result), id| { id: id, task: task, result: result } }
              .map do |d|
                { id: d[:id],
                  task: d[:task],
                  result: d[:result],
                  date: PLANK_START_DAY + d[:id] - 1 }
              end

  TABLE.truncate
  TABLE.multi_insert(value)
end
