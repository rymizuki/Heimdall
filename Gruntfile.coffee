'use strict'

module.exports = (grunt) ->
  # load all 'grunt-*' tasks
  require('matchdep').filterDev('grunt-*').forEach grunt.loadNpmTasks

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    concat:
      main:
        dest: "dist/jquery.heimdall.js"
        src: [
          "js/heimdall.js"
          "js/heimdall-result.js"
          "js/constraints/DEFAULTS.js"
        ]
      vender:
        dest: "test/vender.js"
        src: [
          "bower_components/jquery/jquery.js"
        ]

    jshint:
      options:
        jshintrc: '.jshintrc'
      files:
        src: "<%= concat.main.dest %>"

    uglify:
      main:
        files:
          "dist/jquery.heimdall.min.js": [ "<%= concat.main.dest %>" ]

    testem:
      jquery:
        options:
          framework: "mocha"
          test_page: "test/runner.mustache"
          parallel: 4
          launch_in_ci: ["PhantomJS", "Chrome", "Chrome Canary", "safari", "firefox"]
        src: [
          "bower_components/expect/expect.js"
          "bower_components/sinon/index.js"
          "bower_components/jquery/jquery.js"
          "<%= concat.main.dest %>"
          "test/constraint.js"
          "test/result.js"
          "test/validator.js"
        ]
      zepto:
        options:
          framework: "mocha"
          test_page: "test/runner.mustache"
          parallel: 4
          launch_in_ci: ["PhantomJS", "Chrome", "Chrome Canary", "safari", "firefox"]
        src: [
          "bower_components/expect/expect.js"
          "bower_components/sinon/index.js"
          "bower_components/zepto/zepto.js"
          "<%= concat.main.dest %>"
          "test/constraint.js"
          "test/result.js"
          "test/validator.js"
        ]

  grunt.registerTask 'main', ["concat:main", "jshint", "uglify:main"]
  grunt.registerTask 'test', ["testem"]
