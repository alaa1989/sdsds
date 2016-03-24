/**
 * Gruntfile.js
 *
 * @author khinds
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 * @copyright Kevin Hinds @ KevinHinds.com
 */
module.exports = function(grunt) {

	// Project configuration.
	grunt
		.initConfig({
				pkg : grunt.file.readJSON('package.json'),
				uglify : {
					options : {
						banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
						mangle : false
					},					
					build : {
						src : [
								'ui/build/angular/app.js',
								'ui/build/angular/components/indexController.js',
								'ui/build/angular/components/menuController.js',
								'ui/build/angular/components/usersController.js',
								'ui/build/angular/shared/controllers/navigation.js',
								'ui/build/angular/shared/directives/scroll.js'
								],
						dest : 'ui/js/app.min.js'
					}
				},
				concat: {
				  options: {
					separator: ';'
				  },
				  dist: {
					src: [
						'node_modules/angular/angular.min.js',
						'node_modules/angular-foundation/mm-foundation-tpls.min.js',
						'node_modules/fastclick/lib/fastclick.js'
					],
					dest: 'ui/js/vendor.min.js'
				  }
				},
				sass : {
					dist : {
						options : {
							style : 'compact'
						},
						files : {
							'ui/css/foundation.css' : 'node_modules/foundation/scss/foundation.scss',
							'ui/css/normalize.css' : 'node_modules/foundation/scss/normalize.scss',
							'ui/css/main.css' : 'ui/build/scss/main.scss'
						}
					}
				},
				cssmin : {
					options : {
						shorthandCompacting : false,
						roundingPrecision : -1
					},
					target : {
						files : {
							'ui/css/font-awesome.min.css' : [ 'node_modules/font-awesome/css/font-awesome.min.css' ],					
							'ui/css/foundation.min.css' : [ 'ui/css/foundation.css' ],
							'ui/css/normalize.min.css' : [ 'ui/css/normalize.css' ],
							'ui/css/main.min.css' : [ 'ui/css/main.css' ]
						}
					}
				}
			});

	// Load the plugins including the file watcher
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Run all tasks
	grunt.registerTask('default', [ 'uglify', 'concat', 'sass', 'cssmin' ]);
};
