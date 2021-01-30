# frozen_string_literal: true

require_relative '../test_helper'
require 'timecop'

class PlankModelTest < TestBase
  def setup
    Timecop.freeze(PLANK_START_DAY)
  end

  # ##################################################
  # 過去
  # ##################################################

  def test_plank_model_past_day
    p = Plank.new({ id: 1, task: 2, result: 3, date: Date.today - 1 })
    assert_equal ({
      day: '001',
      date: '2018-10-22 mon',
      task: '2 sec',
      result: '3 sec',
      today: false,
      bg_color: 'table-success'
    }), p.disp
  end

  def test_plank_model_past_day_with_result_zero
    p = Plank.new({ id: 1, task: 2, result: 0, date: Date.today - 1 })
    assert_equal ({
      day: '001',
      date: '2018-10-22 mon',
      task: '2 sec',
      result: '0 sec',
      today: false,
      bg_color: 'table-danger'
    }), p.disp
  end

  def test_plank_model_past_day_none_result
    p = Plank.new({ id: 1, task: 2, date: Date.today - 1 })
    assert_equal ({
      day: '001',
      date: '2018-10-22 mon',
      task: '2 sec',
      result: nil,
      today: false,
      bg_color: ''
    }), p.disp
  end

  # ##################################################
  # 当日
  # ##################################################

  def test_plank_model_today_none_result
    p = Plank.new({ id: 1, task: 2, date: Date.today })
    assert_equal ({
      day: '001',
      date: '2018-10-23 tue',
      task: '2 sec',
      result: nil,
      today: true,
      bg_color: 'table-warning'
    }), p.disp
  end

  def test_plank_model_today_with_result
    p = Plank.new({ id: 1, task: 2, result: 3, date: Date.today })
    assert_equal ({
      day: '001',
      date: '2018-10-23 tue',
      task: '2 sec',
      result: '3 sec',
      today: true,
      bg_color: 'table-success table-warning'
    }), p.disp
  end

  # ##################################################
  # 未来
  # ##################################################

  def test_plank_model_future_none_result
    p = Plank.new({ id: 2, task: 2, date: Date.today + 1 })
    assert_equal ({
      day: '002',
      date: '2018-10-24 wed',
      task: '2 sec',
      result: nil,
      today: false,
      bg_color: ''
    }), p.disp
  end

  def test_plank_model_future_with_result
    p = Plank.new({ id: 2, task: 2, result: 3, date: Date.today + 1 })
    assert_equal ({
      day: '002',
      date: '2018-10-24 wed',
      task: '2 sec',
      result: '3 sec',
      today: false,
      bg_color: 'table-success'
    }), p.disp
  end
end
