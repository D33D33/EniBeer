/** See
 https://github.com/gruntjs/grunt-contrib-concat
 https://github.com/gruntjs/grunt-contrib-uglify
 https://github.com/gruntjs/grunt-contrib-jshint
 **/
module.exports = function( grunt )
{
    // Project configuration.
    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),
        dirs: {
            srcJs: 'public/js',
            libJs: 'public/lib'
        },
        concat: {
            options: {
                separator: ''
            },
            dist: {
                src: [
                    '<%= dirs.libJs %>/angular/angular.js',
                    '<%= dirs.libJs %>/angular/angular-route.js',
                    '<%= dirs.libJs %>/angular/angular-cookies.js',
                    '<%= dirs.srcJs %>/*.js'
                ],
                dest: 'dist/<%= pkg.name %>.js',
                nonull: true
            }
        },
        jshint: {
            app: ['<%= dirs.srcJs %>/*.js']
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: true
            },
            build: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        copy: {
            app: {
                src: [
                    'dist/<%= pkg.name %>.js',
                    'dist/<%= pkg.name %>.min.js'
                ],
                dest: 'public/'
            }
        }
    } );

    // Load plugins
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );

    // Default task(s).
    grunt.registerTask( 'default', ['jshint:app', 'concat', 'uglify', 'copy:app'] );

};
