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
          "js/result.js"
          "js/constraint/default.js"
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
      main:
        src: [
          "bower_components/expect/expect.js"
          "bower_components/sinon/index.js"
          "<%= concat.main.dest %>"
          "test/constraint.js"
          "test/result.js"
          "test/validator.js"
        ]
      options:
        test_page: "test/runner.mustache"
        parallel: 4
        launch_in_ci: ["PhantomJS"]

  grunt.registerTask 'main', ["concat:main", "jshint", "uglify:main"]
  grunt.registerTask 'test', ["testem"]
