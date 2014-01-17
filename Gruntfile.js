module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
      runcode: {
        command: 'node code.js &> out.log'
      }
    },
    watch: {
      scripts: {
        files: 'code.js',
        tasks: ['shell']
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

};