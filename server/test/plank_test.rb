# frozen_string_literal: true

require_relative './test_helper'
require 'timecop'

class PlankTest < TestBase
  def test_api_plank
    get '/api/plank'
    assert last_response.ok?
    assert_equal 'application/json', last_response.media_type
  end

  def test_plank_class_past_day
    p = Plank.new(1, 2, 3)
    assert_equal '001', p.display_day
    assert_equal '2018-10-23 tue', p.display_date
    assert_equal '2 sec', p.display_task
    assert_equal '3 sec', p.display_result
    assert_equal false, p.today?
    assert_equal 'table-success', p.bg_color
  end

  def test_plank_class_past_day_with_result_zero
    p = Plank.new(1, 2, 0)
    assert_equal '001', p.display_day
    assert_equal '2018-10-23 tue', p.display_date
    assert_equal '2 sec', p.display_task
    assert_equal '0 sec', p.display_result
    assert_equal false, p.today?
    assert_equal 'table-danger', p.bg_color
  end

  def test_plank_class_past_day_none_result
    p = Plank.new(1, 2, nil)
    assert_equal '001', p.display_day
    assert_equal '2018-10-23 tue', p.display_date
    assert_equal '2 sec', p.display_task
    assert_nil p.display_result
    assert_equal false, p.today?
    assert_equal '', p.bg_color
  end

  def test_plank_class_today_none_result # rubocop:disable Metrics/AbcSize
    Timecop.travel(Time.new(2018, 10, 23)) do
      p = Plank.new(1, 2, nil)
      assert_equal '001', p.display_day
      assert_equal '2018-10-23 tue', p.display_date
      assert_equal '2 sec', p.display_task
      assert_nil p.display_result
      assert_equal true, p.today?
      assert_equal 'table-warning', p.bg_color
    end
  end

  def test_plank_class_today_with_result # rubocop:disable Metrics/AbcSize
    Timecop.travel(Time.new(2018, 10, 23)) do
      p = Plank.new(1, 2, 3)
      assert_equal '001', p.display_day
      assert_equal '2018-10-23 tue', p.display_date
      assert_equal '2 sec', p.display_task
      assert_equal '3 sec', p.display_result
      assert_equal true, p.today?
      assert_equal 'table-success table-warning', p.bg_color
    end
  end

  def test_plank_class_future_none_result # rubocop:disable Metrics/AbcSize
    Timecop.travel(Time.new(2018, 10, 23)) do
      p = Plank.new(2, 2, nil)
      assert_equal '002', p.display_day
      assert_equal '2018-10-24 wed', p.display_date
      assert_equal '2 sec', p.display_task
      assert_nil p.display_result
      assert_equal false, p.today?
      assert_equal '', p.bg_color
    end
  end

  def test_plank_class_future_with_result # rubocop:disable Metrics/AbcSize
    Timecop.travel(Time.new(2018, 10, 23)) do
      p = Plank.new(2, 2, 3)
      assert_equal '002', p.display_day
      assert_equal '2018-10-24 wed', p.display_date
      assert_equal '2 sec', p.display_task
      assert_equal '3 sec', p.display_result
      assert_equal false, p.today?
      assert_equal 'table-success', p.bg_color
    end
  end
end
