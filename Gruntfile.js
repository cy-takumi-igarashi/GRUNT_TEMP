var path = {
  'scss': './scss/',
  'src_css': './src/css/',
  'js': './js/',
  'src_js': './src/js/',
}

module.exports = function(grunt){
  'use strict';
  
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    /* cssを整形 */
    compass: {
      compaile: {
        options: {
          config: 'config.rb'
        }
      }
    },
    autoprefixer: {
      file: {
        expand: true,
        flatten: true,
        src: path.src_css + '*.css',
        dest: path.src_css
      }
    },
    /* jsを整形 */
    concat: {
      files: {
        src: path.js + '*.js',
        dest: path.src_js + 'app.js'
      }
    },
    uglify: {
      main: {
        src: path.src_js + 'app.js',
        dest: path.src_js + 'app.min.js'
      }
    },
    /* watch項目 */
    watch: {
      css: {
        tasks: ['css'],
        files: [path.scss + '*.scss']
      },
      js: {
        tasks: ['js'],
        files: [path.js + '*.js']
      }
    }
    
  });
  
  var taskName;
  for(taskName in pkg.devDependencies) {
    if(taskName.substring(0, 6) == 'grunt-') {
      grunt.loadNpmTasks(taskName);
    }
  }
  /* Tasks */
  grunt.registerTask('css', ['compass', 'autoprefixer']);
  grunt.registerTask('js', ['concat', 'uglify']);
  grunt.registerTask('pre-commit', ['css', 'js']);
  grunt.registerTask('watch', ['pre-commit', 'watch']);
  
  /* default */
  grunt.registerTask('default', ['pre-commit', 'watch']);
}