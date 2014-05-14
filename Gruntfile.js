// This is the main application configuration file.  It is a Grunt
// configuration file, which you can learn more about here:
// https://github.com/cowboy/grunt/blob/master/docs/configuring.md
//
module.exports = function (grunt) {

  var componentList = [

    // Gaming Libs
    'melonJS/build/melonJS-1.0.0.js',
    '../../../node_modules/easystarjs/bin/easystar-0.1.6.js', // <- blech
    'howlerjs/howler.js',

    // jQuery and Related
    'jquery/jquery.js',

    // AngularJS libraries
    'angular/angular.js',

    // utilities
    'lodash/dist/lodash.js',
    'moment/moment.js'
  ],

  watchedFiles = [
    'client/src/**/*.js',
    'client/test/**/*.js',
    '<%= assets %>/templates/**/*.html',
    '<%= assets %>/less/**/*.less'
  ];

  grunt.initConfig ({
    pkg: grunt.file.readJSON('package.json'),

    assets: 'client/assets',
    components: '<%= assets %>/js',
    clientdist: 'client/dist',

    // The clean task ensures all files are removed from the dist/ directory so
    // that no files linger from previous builds.
    clean: ['dist', '<%= clientdist %>', 'client/docs', 'client/test-reports'],

    // The jshint option for scripturl is set to lax, because the anchor
    // override inside main.js needs to test for them so as to not accidentally
    // route.
    jshint:{
      code: {
        src: ['client/src/**/*.js']
      },
      specs: {
        src: ['client/test/**/*.js'],
        options: {
          expr: true
        }
      }
    },

    // Compiles the Less files into the style.css file.
    less:{
      app:{
        options: {
          paths: ['<%= assets %>/less']
        },
        files: {
          '<%= clientdist %>/assets/css/style.css': '<%= assets %>/less/style.less'
        }
      }
    },

    // Combines the application templates into a single javascript file that populates
    // the angular template cache.
    //
    // Also builds the angular ui-bootstrap application specific template overrides
    html2js: {
      // Application Templates
      main: {
        options: {
          base: 'client',
        },
        src: [
          '<%= assets %>/templates/*.html'
        ],
        dest: '<%= clientdist %>/assets/templates/main.templates.js'
      }
    },

    // The concatenate task is used here to merge the almond require/define
    // shim and the templates into the application code.
    concat:{
      jsdeps: {
        src: getConcatFiles(),
        dest: '<%= clientdist %>/assets/js/deps.js'
      },
      appjs: {
        src: [
          '<%= clientdist %>/assets/js/deps.js',
          '<%= clientdist %>/assets/templates/main.templates.js',
          'client/src/**/*.js'
        ],
        dest: '<%= clientdist %>/assets/js/app.js'
      },
      css: {
        src: [
          '<%= clientdist %>/assets/css/style.css'
        ],
        dest: '<%= clientdist %>/assets/css/style.css'
      }
    },

    // This task uses the MinCSS Node.js project to take all your CSS files in
    // order and concatenate them into a single CSS file named style.css.  It
    // also minifies all the CSS as well.  This is named style.css, because we
    // only want to load one stylesheet in index.html.
    cssmin: {
      all: {
        files: {
          '<%= clientdist %>/assets/css/style.min.css': ['<%= clientdist %>/assets/css/style.css']
        }
      }
    },

    // Takes the built app.js file and minifies it for filesize benefits.
    uglify: {
      dist: {
        files: {
          '<%= clientdist %>/assets/js/app.min.js': ['<%= clientdist %>/assets/js/app.js']
        }
      }
    },

    // A task that runs in the background 'watching' for changes to code.
    watch: {
      options: {
        livereload: true,
        atBegin: true
      },
      development: {
        files: watchedFiles,
        tasks: ['development'] 
      },
      debug: {
        files: watchedFiles,
        tasks: ['debug'] 
      },
      production: {
        files: watchedFiles,
        tasks: ['production'] 
      }
    },

    // Stages all the files for running the application.  Each of these
    // tasks are cumulative where production builds off of debug, debug
    // off of development, and development off of vendor.
    // vendor: All of the 3rd party library files
    // development: All of the files required for development mode
    // debug: All of the files required for debug mode
    // production:  All of the files required for production mode
    copy: {
      vendor: {
        files: [
          {
            expand: true,
            cwd: '<%= components %>/font-awesome/fonts',
            src:['**'],
            dest:'<%= clientdist %>/assets/font/font-awesome'
          },
          {
            expand: true,
            cwd: '<%= components %>/lato/font',
            src:['**'],
            dest:'<%= clientdist %>/assets/font/lato'
          }
        ]
      },
      development: {
        files: [
          {
            expand: true,
            cwd: '<%= assets %>',
            src: ['img/**', 'font/**', 'bgm/**', 'map/**', 'sfx/**'],
            dest: '<%= clientdist %>/assets'
          },
          {
            src: '<%= assets %>/html/index.html',
            dest:'<%= clientdist %>/<%= pkg.name %>/index.html'
          }
        ]
      },
      debug: {
        files: [
          {
            expand: true,
            cwd: '<%= clientdist %>/assets',
            src: ['css/style.css', 'font/**', 'img/**', 'bgm/**', 'map/**', 'sfx/**', 'js/app.js'],
            dest: '<%= clientdist %>/<%= pkg.name %>-debug/assets'
          },
          {
            src: '<%= assets %>/html/index.html',
            dest:'<%= clientdist %>/<%= pkg.name %>/index.html'
          }
        ]
      },
      production: {
        files: [
          {
            expand: true,
            cwd: '<%= clientdist %>/assets',
            src: ['css/style.min.css', 'font/**', 'img/**', 'bgm/**', 'map/**', 'sfx/**', 'js/app.min.js'],
            dest: '<%= clientdist %>/<%= pkg.name %>/assets'
          },
          {
            src: '<%= assets %>/html/index.html',
            dest:'<%= clientdist %>/<%= pkg.name %>/index.html'
          }
        ]
      }
    },

    // Compile the **jade** templates into html for deployment
    jade: {
      development: {
        options: {
          pretty: true,
          data: {
            env: 'development',
            applicationScripts : getScripts('client/src', 'src'),
            templateScripts: [
              'assets/templates/main.templates.js'
            ]
          }
        },
        files: {
          'client/index.html': ['api/app/views/application/index.jade']
        }
      },
      gh: {
        options: {
          pretty: true,
          data: {
            env: 'gh',
            applicationScripts : getScripts('client/src', 'src'),
            templateScripts: [
              'assets/templates/main.templates.js'
            ]
          }
        },
        files: {
          'client/index.html': ['api/app/views/application/index.jade']
        }
      },
      debug: {
        options: {
          pretty: true,
          data: {
            debug: true,
            env: 'debug'
          }
        },
        files: {
          '<%= assets %>/html/index.html': ['api/app/views/application/index.jade']
        }
      },
      production: {
        options: {
          data: {
            debug: false,
            env: 'production'
          }
        },
        files: {
          '<%= assets %>/html/index.html': ['api/app/views/application/index.jade']
        }
      }
    },

    // The **docco** task iterates through the `src` files and creates annotated source reports for them.
    docco: {
      options: {
        layout: 'parallel'
      },
      client: {
        options: {
          output: 'dist/docs/client/'
        },
        src: 'client/src/**/*.js'
      },
      app: {
        options: {
          output: 'dist/docs/app/'
        },
        src: 'app/**/*.js'
      },
      grunt: {
        options: {
          output: 'dist/docs/docs/grunt/'
        },
        src: 'Gruntfile.js'
      },
      config: {
        options: {
          output: 'dist/docs/config/'
        },
        src: 'config/**/*.js'
      }
    },

    // The **runapp** task will run the `server.js` in a `nodemon` and watch the server files for changes
    runapp: {
      development: {
        env: 'development'
      },

      debug: {
        env: 'debug'
      },

      production: {
        env: 'production'
      },

      test: {
        options: {
          dieWithParent: true
        },
        env: 'development'
      }
    },

    // Task to add the array-style angular injection to protect against uglifying.
    ngmin: {
      app: {
        src: 'client/src/**/*.js',
        dest: '<%= clientdist %>/app.js'
      }
    },

    shell: {
      melonJS : {
        options: {
          stdout: true,
          stderr: true,
          execOptions: {
            cwd: '<%= components %>/melonJS'
          }
        },
        command: 'npm install'
      },
      publish : {
        options: {
          stdout: true,
          stderr: true
        },
        command: 'git subtree split --branch gh-pages --prefix client/'
      }
    },

    // Runs dependency grunt builds
    hub: {
      melonJS: {
        src: ['<%= components %>/melonJS/Gruntfile.js'],
        tasks: ['concat', 'replace:dist']
      }
    }

  });

  // *********************************************************************************************

  function getConcatFiles() {
    var _ = require('lodash');

    return _.map(componentList, function (component) {
      return '<%= components %>/' + component;
    });
  }
 
  function getScripts(dir, dest) {
    var path = require('path');
    var fs = require('fs');
    var files = fs.readdirSync(dir);
    var _ = require('lodash');
    var scripts = [];

    _.each(files, function (file) {
      var name = dir + '/' + file;
      var destName = dest + '/' + file;
    
      if (fs.statSync(name).isDirectory()) {
          scripts = scripts.concat(getScripts(name, destName));
      } else if (path.extname(file) === '.js') {
        scripts.push(destName);
      }

    });

    return scripts;
  }

  // *********************************************************************************************

  // Load NPM Package Tasks
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-mixtape-run-app');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-hub');

  // **********************************************************************************************

  // The default task will remove all contents inside the dist/ folder, lint
  // all your code, precompile all the underscore templates into
  // dist/debug/templates.js, compile all the application code into
  // dist/debug/require.js, and then concatenate the require/define shim
  // almond.js and dist/debug/templates.js into the require.js file.

  grunt.registerTask('default', [
    'clean', 'shell:melonJS', 'hub', 'jshint', 'less', 'concat:css', 'html2js', 'concat:jsdeps', 'copy:vendor', 'copy:development', 'jade:development'
  ]);

  // Task to compile everything in development mode
  grunt.registerTask('development', ['default']);
  grunt.registerTask('debug', ['development', 'concat:appjs', 'jade:debug', 'copy:debug']);
  grunt.registerTask('production', ['debug', 'cssmin', 'uglify', 'jade:production', 'copy:production']);

  // Forks off the application server and runs the unit and e2e tests.
  // Test results stored in client/test-reports
  grunt.registerTask('test', ['production', 'runapp:test']);

  grunt.registerTask('publish', ['development', 'jade:gh', 'shell:publish']);
};
