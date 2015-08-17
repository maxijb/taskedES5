/**
 * Gruntfile
 *
 * If you created your Sails app with `sails new foo --linker`, 
 * the following files will be automatically injected (in order)
 * into the EJS and HTML files in your `views` and `assets` folders.
 *
 * At the top part of this file, you'll find a few of the most commonly
 * configured options, but Sails' integration with Grunt is also fully
 * customizable.  If you'd like to work with your assets differently 
 * you can change this file to do anything you like!
 *
 * More information on using Grunt to work with static assets:
 * http://gruntjs.com/configuring-tasks
 */

module.exports = function (grunt) {



  /**
   * CSS files to inject in order
   * (uses Grunt-style wildcard/glob/splat expressions)
   *
   * By default, Sails also supports LESS in development and production.
   * To use SASS/SCSS, Stylus, etc., edit the `sails-linker:devStyles` task 
   * below for more options.  For this to work, you may need to install new 
   * dependencies, e.g. `npm install grunt-contrib-sass`
   */

  var cssFilesToInject = [
    '**/linker/**/*.css'
  ];


  /**
   * Javascript files to inject in order
   * (uses Grunt-style wildcard/glob/splat expressions)
   *
   * To use client-side CoffeeScript, TypeScript, etc., edit the 
   * `sails-linker:devJs` task below for more options.
   */

  // var jsFilesToInject = [

  //   // Below, as a demonstration, you'll see the built-in dependencies 
  //   // linked in the proper order order

  //   // Bring in the socket.io client
  //   '**/linker/js/socket.io.js',

  //   // then beef it up with some convenience logic for talking to Sails.js
  //   '**/linker/js/sails.io.js',

  //   // A simpler boilerplate library for getting you up and running w/ an
  //   // automatic listener for incoming messages from Socket.io.
  //   '**/linker/js/app.js',
  //   '**/linker/js/plugins/amplify.js',
  //   '**/linker/js/plugins/leaflet-0.7.2.js',
  //   '**/linker/js/maps/maps_base.js',

  //   // *->    put other dependencies here   <-*

  //   // All of the rest of your app scripts imported here
  //   '**/linker/**/*.js'
  // ];


  /**
   * Client-side HTML templates are injected using the sources below
   * The ordering of these templates shouldn't matter.
   * (uses Grunt-style wildcard/glob/splat expressions)
   * 
   * By default, Sails uses JST templates and precompiles them into 
   * functions for you.  If you want to use jade, handlebars, dust, etc.,
   * edit the relevant sections below.
   */

  var templateFilesToInject = [
    'linker/**/*.html'
  ];


  /* Timestamp for versioning: path /public/-timestamp-/**whatever */
  var fs = require('fs');
  var timestamp = grunt.file.read('.timestamp');
  // fs.readFile('config/timestamp', function(err, data) {
  //     timestamp = data;
  // });

  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  //
  // DANGER:
  //
  // With great power comes great responsibility.
  //
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////

  // Modify css file injection paths to use 
  cssFilesToInject = cssFilesToInject.map(function (path) {
    return '.tmp/public/' + path;
  });

  // Modify js file injection paths to use 
  // jsFilesToInject = jsFilesToInject.map(function (path) {
  //   return '.tmp/public/' + path;
  // });


  var jsFilesToInject = function(timestamp) {
     
     timestamp = (!!timestamp) ? timestamp + '/' : "";
    

     var toInject = [

        // Below, as a demonstration, you'll see the built-in dependencies 
        // linked in the proper order order

        // Bring in the socket.io client
        '**/linker/js/socket.io.js',

        // then beef it up with some convenience logic for talking to Sails.js
        '**/linker/js/sails.io.js',

        // A simpler boilerplate library for getting you up and running w/ an
        // automatic listener for incoming messages from Socket.io.
        '**/linker/js/app.js',
        '**/linker/js/plugins/amplify.js',
        '**/linker/js/plugins/leaflet-0.7.2.js',
        '**/linker/js/maps/maps_base.js',
        
        '**/linker/js/components/components.js',

        // *->    put other dependencies here   <-*

        // All of the rest of your app scripts imported here
        '**/linker/**/*.js'
      ];


      return toInject.map(function (path) {
          return '.tmp/public/' + timestamp +path;
      });
  }

  
  templateFilesToInject = templateFilesToInject.map(function (path) {
    return 'assets/' + path;
  });


  // Get path to core grunt dependencies from Sails
  var depsPath = grunt.option('gdsrc') || 'node_modules/sails/node_modules';
  grunt.loadTasks(depsPath + '/grunt-contrib-clean/tasks');
  grunt.loadTasks(depsPath + '/grunt-contrib-copy/tasks');
  grunt.loadTasks(depsPath + '/grunt-contrib-concat/tasks');
  grunt.loadTasks(depsPath + '/grunt-sails-linker/tasks');
  grunt.loadTasks(depsPath + '/grunt-contrib-jst/tasks');
  grunt.loadTasks(depsPath + '/grunt-contrib-watch/tasks');
  grunt.loadTasks(depsPath + '/grunt-contrib-uglify/tasks');
  grunt.loadTasks(depsPath + '/grunt-contrib-cssmin/tasks');
  grunt.loadTasks(depsPath + '/grunt-contrib-less/tasks');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-browserify');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


      'string-replace': {
          cssUrls: {
            files: {
              '.tmp/public/replaced/concat/production.css': '.tmp/public/' + timestamp + '/concat/production.css'
            }
            ,
            options: {
              replacements: [{
                pattern: 'url(',
                replacement: 'url(' + timestamp 
              }]
            }
          }
      },
      

      jade: {


        compile: {
          options: {

            client: true
          },

          expand: true,
          cwd: './assets/linker/templates',
          src: ['**/*.jade'],
          dest: '.tmp/public/linker/templates',
          ext: '.js'

        },

        viewsCompile:  {
          options: {
            client: true
          },

          expand: true,
          cwd: './views/',
          src: ['**/client/**/*.jade'],
          dest: '.tmp/public/linker/templates',
          ext: '.js'

        },

        prodCompile: {
          options: {

            client: true
          },

          expand: true,
          cwd: './assets/linker/templates',
          src: ['**/*.jade'],
          dest: '.tmp/public/'+timestamp+'/linker/templates' ,
          ext: '.js'

        },

        prodViewsCompile:  {
          options: {
            client: true
          },

          expand: true,
          cwd: './views/',
          src: ['**/client/**/*.jade'],
          dest: '.tmp/public/'+timestamp+'/linker/templates',
          ext: '.js'

        }

      },



    copy: {
      dev: {
        files: [
          {
          expand: true,
          cwd: './assets',
          src: ['**/*.!(coffee)'],
          dest: '.tmp/public' 
        }
        ]
      },
      build: {
        files: [
          {
          expand: true,
          cwd: './assets',
          src: ['**/*.!(coffee)'],
          dest: '.tmp/public/' + timestamp 
        }
        ]
      }
    },

    clean: {
      dev: ['.tmp/public/**'],
      build: ['www'],
      postConcat: ['.tmp/public/replaced', '.tmp/public/linker']
    },

    jst: {
      dev: {

        // To use other sorts of templates, specify the regexp below:
        // options: {
        //   templateSettings: {
        //     interpolate: /\{\{(.+?)\}\}/g
        //   }
        // },

        files: {
          '.tmp/public/jst.js': templateFilesToInject
        }
      }
    },

    less: {
      dev: {
        files: [
          {
          expand: true,
          cwd: 'assets/styles/',
          src: ['*.less'],
          dest: '.tmp/public/styles/',
          ext: '.css'
        }, {
          expand: true,
          cwd: 'assets/linker/styles/',
          src: ['**/*.less'],
          dest: '.tmp/public/linker/styles/',
          ext: '.css'
        }
        ]
      },
      prod: {
        files: [
          {
          expand: true,
          cwd: 'assets/styles/',
          src: ['**/*.less'],
          dest: '.tmp/public/'+timestamp+'/styles/',
          ext: '.css'
        }, {
          expand: true,
          cwd: 'assets/linker/styles/',
          src: ['**/*.less'],
          dest: '.tmp/public/'+timestamp+'/linker/styles/',
          ext: '.css'
        }
        ]
      }
    },
    
    
    concat: {
      js: {
        src: jsFilesToInject(),
        dest: '.tmp/public/'+timestamp+'/concat/production.js'
      },
      css: {
        src: cssFilesToInject,
        dest: '.tmp/public/'+timestamp+'/concat/production.css'
      }
    },

    uglify: {
      dist: {
        src: ['.tmp/public/'+timestamp+'/concat/production.js'],
        dest: '.tmp/public/'+timestamp+'/min/production.js'
      }
    },

    cssmin: {
      dist: {
        src: ['.tmp/public/replaced/concat/production.css'],
        dest: '.tmp/public/'+timestamp+'/min/production.css'
      }
    },

    'sails-linker': {

    //   devJs: {
    //     options: {
    //       startTag: '<!--SCRIPTS-->',
    //       endTag: '<!--SCRIPTS END-->',
    //       fileTmpl: '<script src="'+timestamp+'/%s"></script>',
    //       appRoot: '.tmp/public/' + timestamp
    //     },
    //     files: {
    //       '.tmp/public/**/*.html': jsFilesToInject,
    //       'views/**/*.html': jsFilesToInject,
    //       'views/**/*.ejs': jsFilesToInject
    //     }
    //   },

    //   prodJs: {
    //     options: {
    //       startTag: '<!--SCRIPTS-->',
    //       endTag: '<!--SCRIPTS END-->',
    //       fileTmpl: '<script src="'+timestamp+'/%s"></script>',
    //       appRoot: '.tmp/public'
    //     },
    //     files: {
    //       '.tmp/public/**/*.html': ['.tmp/public/min/production.js'],
    //       'views/**/*.html': ['.tmp/public/min/production.js'],
    //       'views/**/*.ejs': ['.tmp/public/min/production.js']
    //     }
    //   },

    //   devStyles: {
    //     options: {
    //       startTag: '<!--STYLES-->',
    //       endTag: '<!--STYLES END-->',
    //       fileTmpl: '<link rel="stylesheet" href="%s">',
    //       appRoot: '.tmp/public'
    //     },

    //     // cssFilesToInject defined up top
    //     files: {
    //       '.tmp/public/**/*.html': cssFilesToInject,
    //       'views/**/*.html': cssFilesToInject,
    //       'views/**/*.ejs': cssFilesToInject
    //     }
    //   },

    //   prodStyles: {
    //     options: {
    //       startTag: '<!--STYLES-->',
    //       endTag: '<!--STYLES END-->',
    //       fileTmpl: '<link rel="stylesheet" href="%s">',
    //       appRoot: '.tmp/public'
    //     },
    //     files: {
    //       '.tmp/public/index.html': ['.tmp/public/min/production.css'],
    //       'views/**/*.html': ['.tmp/public/min/production.css'],
    //       'views/**/*.ejs': ['.tmp/public/min/production.css']
    //     }
    //   },

    //   // Bring in JST template object
    //   devTpl: {
    //     options: {
    //       startTag: '<!--TEMPLATES-->',
    //       endTag: '<!--TEMPLATES END-->',
    //       fileTmpl: '<script type="text/javascript" src="%s"></script>',
    //       appRoot: '.tmp/public'
    //     },
    //     files: {
    //       '.tmp/public/index.html': ['.tmp/public/jst.js'],
    //       'views/**/*.html': ['.tmp/public/jst.js'],
    //       'views/**/*.ejs': ['.tmp/public/jst.js']
    //     }
    //   },


      /*******************************************
       * Jade linkers (TODO: clean this up)
       *******************************************/

      devJsJADE: {
        options: {
          startTag: '// SCRIPTS',
          endTag: '// SCRIPTS END',
          fileTmpl: 'script(type="text/javascript", src="%s")',
          appRoot: '.tmp/public' 
        },
        files: {
          'views/**/*.jade': jsFilesToInject()
        }
      },

      prodJsJADENoCompress: {
        options: {
          startTag: '// SCRIPTS NO COMPRESS',
          endTag: '// SCRIPTS NO COMPRESS END',
          fileTmpl: 'script(type="text/javascript", src="%s")',
          appRoot: '.tmp/public' 
        },
        files: {
          'views/**/*.jade': jsFilesToInject()
        }
      },

      prodJsJADE: {
        options: {
          startTag: '// SCRIPTS',
          endTag: '// SCRIPTS END',
          fileTmpl: 'script(type="text/javascript", src="/'+timestamp+'%s")',
          appRoot: '.tmp/public/' + timestamp
        },
        files: {
          'views/**/*.jade': ['.tmp/public/'+timestamp+'/min/production.js']
        }
      },

      devStylesJADE: {
        options: {
          startTag: '// STYLES',
          endTag: '// STYLES END',
          fileTmpl: 'link(rel="stylesheet", href="%s")',
          appRoot: '.tmp/public' 
        },
        files: {
          'views/**/*.jade': cssFilesToInject
        }
      },

      prodStylesJADENoCompress: {
        options: {
          startTag: '// STYLES NO COMPRESS',
          endTag: '// STYLES NO COMPRESS END',
          fileTmpl: 'link(rel="stylesheet", href="%s")',
          appRoot: '.tmp/public' 
        },
        files: {
          'views/**/*.jade': cssFilesToInject
        }
      },

      prodStylesJADE: {
        options: {
          startTag: '// STYLES',
          endTag: '// STYLES END',
          fileTmpl: 'link(rel="stylesheet", href="/'+timestamp+'%s")',
          appRoot: '.tmp/public/' + timestamp
        },
        files: {
          'views/**/*.jade': ['.tmp/public/'+timestamp+'/min/production.css']
        }
      },

      // Bring in JST template object
      // devTplJADE: {
      //   options: {
      //     startTag: '// TEMPLATES',
      //     endTag: '// TEMPLATES END',
      //     fileTmpl: 'script(type="text/javascript", src="%s")',
      //     appRoot: '.tmp/public' 
      //   },
      //   files: {
      //     'views/**/*.jade': ['.tmp/public/jst.js']
      //   }
      // }
      /************************************
       * Jade linker end
       ************************************/
    },

    react: {
      
      dynamic_mappings: {
        files: [
          {
            expand: true,
            cwd: 'assets/components',
            src: ['**/*.jsx'],
            dest: '.tmp/public/components',
            ext: '.js'
          }
        ]
      }
    },


    browserify: {
      dist: {
        files: {
          '.tmp/public/linker/js/actions/index.js': [ '.tmp/public/js/browserify/index/**/*.js'],
          '.tmp/public/linker/js/actions/dashboard.js': [ '.tmp/public/js/browserify/dashboard/**/*.js'],
          '.tmp/public/linker/js/actions/account.js': [ '.tmp/public/js/browserify/account/**/*.js'],
          '.tmp/public/linker/js/actions/extension.js': [ '.tmp/public/js/browserify/extension/**/*.js'],
          '.tmp/public/linker/js/actions/main.js': [ '.tmp/public/js/browserify/main/**/*.js']

        }
      }
    },


    watch: {
      api: {

        // API files to watch:
        files: ['api/**/*']
      },
      assets: {

        // Assets to watch:
        files: ['assets/**/*'],

        // When assets are changed:
        tasks: ['compileAssets', 'linkAssets']
      }
    }
  });

  // When Sails is lifted:
  grunt.registerTask('default', [
    'compileAssets',
    'linkAssets'
    ,'watch'
  ]);

  // When Sails is lifted:
  grunt.registerTask('dev', [
    'compileAssets',
    'linkAssets'
  ]);

  grunt.registerTask('compileAssets', [
    'clean:dev',
    'jst:dev',
    'less:dev',
    'copy:dev',    
    'react:dynamic_mappings',
    'browserify:dist',
    'jade:compile',
    'jade:viewsCompile'
  ]);

  grunt.registerTask('linkAssets', [

    // Update link/script/template references in `assets` index.html
    // 'sails-linker:devJs',
    // 'sails-linker:devStyles',
    // 'sails-linker:devTpl',
    ////////////////////////////////SACAMOS ESTE POR BROWSERIFY
    //'sails-linker:devJsJADE',
    ////////////////////////////////END SACAMOS ESTE POR BROWSERIFY
    'sails-linker:devStylesJADE'
    // 'sails-linker:devTplJADE'
  ]);


  // Build the assets into a web accessible folder.
  // (handy for phone gap apps, chrome extensions, etc.)
  grunt.registerTask('build', [
    'compileAssets',
    'linkAssets',
    'clean:build',
    'copy:build'
  ]);

  ////TODO: all the concat is wrong... ////

  // When sails is lifted in production
  grunt.registerTask('prod', [
    'clean:dev',
    'jst:dev',
    'less:prod',
    'copy:build',
    'jade:prodCompile',
    'jade:prodViewsCompile',
    'react:dynamic_mappings',
    'browserify:dist',
    'browserify:main',
    'concat',
    'string-replace:cssUrls',
    'uglify',
    'cssmin',
    // 'sails-linker:prodJs',
    // 'sails-linker:prodStyles',
    // 'sails-linker:devTpl',
    'sails-linker:prodJsJADE',
    'sails-linker:prodStylesJADE',
    'sails-linker:prodStylesJADENoCompress',
    // 'sails-linker:devTplJADE',
    'sails-linker:prodJsJADENoCompress',
    'clean:postConcat' 
  ]);

  // When API files are changed:
  // grunt.event.on('watch', function(action, filepath) {
  //   grunt.log.writeln(filepath + ' has ' + action);

  //   // Send a request to a development-only endpoint on the server
  //   // which will reuptake the file that was changed.
  //   var baseurl = grunt.option('baseurl');
  //   var gruntSignalRoute = grunt.option('signalpath');
  //   var url = baseurl + gruntSignalRoute + '?action=' + action + '&filepath=' + filepath;

  //   require('http').get(url)
  //   .on('error', function(e) {
  //     console.error(filepath + ' has ' + action + ', but could not signal the Sails.js server: ' + e.message);
  //   });
  // });
};
