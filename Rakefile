# frozen_string_literal: true

require 'rake/testtask'

task default: [:test]

Rake::TestTask.new do |test|
  test.pattern = './server/**/*_test.rb'
  # test.test_files = %w[test/test.rb]

  test.warning = false
  test.verbose = false
end
