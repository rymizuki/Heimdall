'use strict'

module.exports = (grunt) ->
  # load all 'grunt-*' tasks
  require('matchdep').filterDev('grunt-*').forEach grunt.loadNpmTasks

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    banner:'/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'

    concat:
      main:
        dest: "dist/heimdall.js"
        options:
          banner: "<%= banner %>"
          stripBanners: true
        src: [
          "js/heimdall.js"
          "js/heimdall-result.js"
          "js/constraints/DEFAULTS.js"
          "js/heimdall-shorthand.js"
        ]
      vender:
        dest: "test/vender.js"
        src: [
          "bower_components/jquery/jquery.js"
        ]

    jshint:
      src:
        options:
          jshintrc: 'js/.jshintrc'
        src: ['js/**/*.js']
      test:
        options:
          jshintrc: 'test/.jshintrc'
        src: ['test/**/*.js']

    uglify:
      options:
        banner: '<%= banner %>'
      main:
        files:
          "dist/heimdall.min.js": [ "<%= concat.main.dest %>" ]

    testem:
      jquery:
        options:
          framework: "mocha"
          test_page: "test/runner.mustache"
          parallel: 4
          launch_in_ci: ["PhantomJS"]
        src: [
          "bower_components/expect/expect.js"
          "bower_components/sinon/index.js"
          "bower_components/jquery/jquery.js"
          "js/heimdall.js"
          "js/heimdall-result.js"
          "js/heimdall-shorthand.js"
          "js/constraints/DEFAULTS.js"
          "test/constraint.js"
          "test/result.js"
          "test/validator.js"
        ]
      zepto:
        options:
          framework: "mocha"
          test_page: "test/runner.mustache"
          parallel: 4
          launch_in_ci: ["PhantomJS"]
        src: [
          "bower_components/expect/expect.js"
          "bower_components/sinon/index.js"
          "bower_components/zepto/zepto.js"
          "js/heimdall.js"
          "js/heimdall-result.js"
          "js/heimdall-shorthand.js"
          "js/constraints/DEFAULTS.js"
          "test/constraint.js"
          "test/result.js"
          "test/validator.js"
        ]

  grunt.registerTask 'default', ['jshint', 'testem', 'concat:main', 'uglify:main']
