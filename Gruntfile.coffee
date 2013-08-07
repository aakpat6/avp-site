module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    less:
      all:
        options:
          yuicompress: true
        files:
          'dist/css/style.css': 'less/style.less'

    concat:
      options:
        separator: ';'
      all:
        src:
          [
            "js/bootstrap.min.js"
            "js/index.js"
          ]
        dest:
          "js/all.js"

    uglify:
      all:
        files:
          "dist/js/all.min.js": "js/all.js"

    htmlmin:
      all:
        options:
          removeComments: true,
          collapseWhitespace: true
        files:
          "dist/index.html": "index.html"

    watch:
      less:
        files: ['less/*.less', 'less/bootstrap/*.less']
        tasks: ['less']
      concat:
        files: ['js/*.js']
        tasks: ['concat', 'uglify']
      htmlmin:
        files: ['index.html']
        tasks: ['htmlmin']
      reload:
        files: ['dist/**/*.*']
        options:
          livereload: true

  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-htmlmin'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['less', 'concat', 'uglify', 'htmlmin', 'watch']
