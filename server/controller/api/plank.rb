# frozen_string_literal: true

PLANK_START_DAY = Date.new(2018, 10, 23)
PLANK_RESULT_FILE_NAME =
  File.expand_path('../../views/xdays_plank_challenge.txt', __dir__)

# /api/plank
get '/api/plank' do
  data = File.readlines(PLANK_RESULT_FILE_NAME)
             .map(&:split)
             .map.with_index(1) { |(t, r), i| Plank.new(i, t, r) }
             .reverse

  data.map! do |r|
    { day: r.display_day,
      date: r.display_date,
      task: r.display_task,
      result: r.display_result,
      today: r.today?,
      bg_color: r.bg_color }
  end

  content_type :json
  json data
end

get '/api/plank/statistics' do
  data = File.readlines(PLANK_RESULT_FILE_NAME)
             .map(&:split)
             .map.with_index(1) { |(t, r), i| Plank.new(i, t, r) }
             .reverse

  rest = data.select { |d| d.task == "rest" }.count
  down = data.select { |d| d.result }.select { |d| d.result.to_i == 0}.count
  fix =  data.select { |d| d.result }.select { |d| d.result.to_i >  0}.count
  total = rest + down + fix
  rest_p = format('%.03g', rest / total.to_f * 100) + '%'
  down_p = format('%.03g', down / total.to_f * 100) + '%'
  fix_p =  format('%.03g', fix / total.to_f * 100) + '%'

  {
    total:  total,
    rest:   rest,
    rest_p: rest_p,
    down:   down,
    down_p: down_p,
    fix:    fix,
    fix_p:  fix_p,
  }.to_json
end

# week names
WEEK = %w[sun mon tue wed thu fri sat].freeze

# Plank Record
class Plank
  attr_reader :day, :task, :result

  def initialize(day, task, result)
    @day    = day
    @task   = task
    @result = result
  end

  def display_day
    format('%03d', day)
  end

  def display_date
    [date, wday].join(' ')
  end

  def display_task
    decorate(task.to_i.zero? ? task.to_sym : task.to_i)
  end

  def display_result
    decorate(result.nil? ? nil : result.to_i)
  end

  def bg_color
    [
      bg_color_rest,
      bg_color_success,
      bg_color_danger,
      bg_color_today
    ].compact.map { |v| "table-#{v}" }.join(' ')
  end

  def today?
    date == Date.today
  end

  private

  def date
    PLANK_START_DAY + day - 1
  end

  def wday
    WEEK[date.wday]
  end

  def decorate(val)
    val.is_a?(Numeric) ? "#{val} sec" : val
  end

  def bg_color_rest
    task == 'rest' ? 'info' : nil
  end

  def bg_color_success
    bg_color_danger.nil? && result ? 'success' : nil
  end

  def bg_color_danger
    !result.nil? && result.to_i.zero? ? 'danger' : nil
  end

  def bg_color_today
    today? ? 'warning' : nil
  end
end
