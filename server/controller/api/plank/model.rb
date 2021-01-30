# frozen_string_literal: true

require_relative '../../../db_connect'
require_relative './create_table'

# first day of plank record
PLANK_START_DAY = Date.new(2018, 10, 23)
# week names
WEEK = %w[sun mon tue wed thu fri sat].freeze

# Plank Record
class Plank < Sequel::Model(DB[:plank])
  def initialize(row)
    row[:date] ||= PLANK_START_DAY
    super(row)
  end

  def disp
    { day: display_day,
      date: display_date,
      task: display_task,
      result: display_result,
      today: today?,
      bg_color: bg_color }
  end

  private

  def display_day
    format('%03d', id)
  end

  def display_date
    "#{date} #{WEEK[date.wday]}"
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
