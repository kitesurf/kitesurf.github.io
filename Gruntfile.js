module.exports = function(grunt) {
  grunt.initConfig({
    uncss: {
      dist: {
        files: {
          '_dist/css/tidy.css': ['_site/index.html', '_site/de/index.html']
        }
      }
    },

    cssmin: {
      dist: {
        options: {
          compatibility: 'ie8',
          keepSpecialComments: 0
        },
        files: [{
          expand: true,
          cwd: '_dist/css',
          src: ['*.css', '!*.min.css'],
          dest: '_dist/css',
          ext: '.min.css'
        }]
      }
    }
 })
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
 
  grunt.registerTask('default', [
    'uncss',
    'cssmin'
    ]);
 
}