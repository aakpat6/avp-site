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
          "dist/js/all.js"

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
      all: ['dist/*']
      font: ['dist/font']
      img: ['dist/img']
      js: ['dist/js/all.js']

    connect:
      devserver:
        options:
          port: 8000
          base: 'dist'

    imagemin:
      all:
        files: [
          expand: true
          src: ['img/**/*.{png,jpg,gif}']
          dest: 'dist/'
        ]

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
        files: ['font/**/*', 'img/*/**']
        tasks: ['clean:font', 'copy']
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
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-imagemin'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'prod', [
    'clean:all'
    'less'
    'concat'
    'uglify'
    'clean:js'
    'htmlmin'
    'copy'
  ]
  grunt.registerTask 'default', [
    'prod'
    'connect'
    'watch'
  ]
