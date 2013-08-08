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
          "dist/js/all.min.js": "dist/js/all.js"

    htmlmin:
      all:
        options:
          removeComments: true,
          collapseWhitespace: true
        files:
          "dist/index.html": "index.html"

    copy:
      img:
        files:
          [
            expand: true
            src: 'img/**/*'
            dest: 'dist/'
            filter: 'isFile'
          ]
      font:
        files:
          [
            expand: true
            src: 'font/**/*'
            dest: 'dist/'
            filter: 'isFile'
          ]

    clean:
      all: ['dist/']
      font: ['dist/font']
      img: ['dist/img']
      js: ['dist/all.js']

    watch:
      less:
        files: ['less/*.less', 'less/bootstrap/*.less']
        tasks: ['less']
      concat:
        files: ['js/*.js']
        tasks: ['concat', 'uglify', 'clean:js']
      htmlmin:
        files: ['index.html']
        tasks: ['htmlmin']
      copy:
        files: ['font/**/*', 'img/**/*']
        tasks: ['clean:font', 'clean:img', 'copy']
      reload:
        files: ['dist/**/*.*']
        options:
          livereload: true

  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-htmlmin'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['clean:all', 'less', 'concat', 'uglify', 'clean:js', 'htmlmin', 'watch']
