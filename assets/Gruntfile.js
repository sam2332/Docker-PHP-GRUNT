module.exports = function (grunt) {

	// 1. All configuration goes here 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				sourceMap: true,
			},
			copy_to_public: {
				src: '../public/js/raw/production.js',
				dest: '../public/js/production.min.js'
			},

		},
		cssmin: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
					'<%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			my_target: {
				files: {
					src: '../public/css/test.css',
					dest: '../public/css-min/test.min.css'
				}
			}
		},
		concat: {
			'compile js scripts bundle': {
				src: [
					'js/vendor/*.js', // All vendor libs
					'js/libs/*.js', // All JS in the libs folder
					'js/main.js' // This specific file
				],
				dest: '../public/js/raw/production.js',
			}
		},
		imagemin: {
			'minifiy images and copy to public': {
				files: [{
					expand: true,
					cwd: 'images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: '../public/images/'
				}]
			}
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true
				},
				reporter: require('jshint-stylish')
			},
			all: ['Gruntfile.js', 'js/*.js', 'js/libs/*.js', "tests/*.js"],
			beforeconcat: ['js/*.js', 'js/libs/*.js'],
		},
		sasslint: {
			dev: {
				target: ['scss/\*.scss']
			},
			production: {
				target: ['../app/css/*.css']
			}
		},
		sass: {
			'compileing scss': {
				files: [{
					expand: true,
					cwd: 'scss',
					src: ['*.scss'],
					dest: '../public/css',
					ext: '.css',
					style: 'compressed'
				}]
			}
		},
		watch: {
			images: {
				files: ['images/**/*.{png,jpg,gif}'],
				tasks: ['imagemin'],
			},
			scss: {
				files: ['scss/*.scss', 'scss/**/.scss'],
				tasks: ['sasslint', 'sass', 'uglify'],

			},
			javascript: {
				files: ['js/*.js', 'js/**/*.js', "tests/*.js"],
				tasks: ['jsbeautifier', 'jshint', 'concat', 'uglify'],
				options: {
					spawn: false,
					livereload: true,
				},
			},
			vendor: {
				files: ['js/vendor/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false,
				},
			},
			test: {
				files: ['js/libs/**/*.js', 'tests/*.js'],
				tasks: ['mochaTest']
			},
			gruntfile: {
				files: ['Gruntfile.js', ],
				tasks: ['jsbeautifier', 'jshint'],
				options: {
					spawn: false,
				},
			},
			css: {
				files: ['../public/css/*.css'],
				tasks: ['cssmin']
			},
			php: {
				files: ['../public/*.php'],
				tasks: ['phpcs']
			}
		},

		jsbeautifier: {
			files: ["Gruntfile.js", "js/*.js", "js/**/*.js", "tests/*.js"],
			options: {
				html: {
					braceStyle: "collapse",
					indentChar: " ",
					indentScripts: "keep",
					indentSize: 4,
					maxPreserveNewlines: 10,
					preserveNewlines: true,
					unformatted: ["a", "sub", "sup", "b", "i", "u"],
					wrapLineLength: 0
				},
				css: {
					indentChar: " ",
					indentSize: 4
				},
				js: {
					braceStyle: "collapse",
					breakChainedMethods: false,
					e4x: false,
					evalCode: true,
					indentChar: " ",
					indentLevel: 0,
					indentSize: 4,
					indentWithTabs: true,
					jslintHappy: true,
					keepArrayIndentation: false,
					keepFunctionIndentation: false,
					maxPreserveNewlines: 10,
					preserveNewlines: true,
					spaceBeforeConditional: true,
					spaceInParen: false,
					unescapeStrings: false,
					wrapLineLength: 0,
					endWithNewline: true
				}
			}
		},
		autoprefixer: {
			'upgrade app css with prefixes': {
				files: {
					'../public/css/test.css': '../public/css/test.css'
				}
			}
		},
		mochaTest: {
			all: {
				src: 'tests/*',
				run: true,
				browserConsoleLogOptions: {
					level: 'log',
					terminal: true
				},
			}
		},
		phpcs: {
			public: {
				src: ['../public/**/*.php']
			},
			options: {
				bin: '/usr/local/bin/phpcs',
				standard: 'PSR2'
			}
		},
		bootlint: {
			options: {
				stoponerror: false,
				relaxerror: [],
				showallerrors: true,
			},
			files: ['../public/*.html']
		}
	});

	// 3. Where we tell Grunt we plan to use this plug-in.


	// Bootstrap
	grunt.loadNpmTasks('grunt-bootlint');

	// JS
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-sass-lint');
	grunt.loadNpmTasks("grunt-jsbeautifier");
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-css');
	grunt.loadNpmTasks('grunt-autoprefixer');

	// PHP
	grunt.loadNpmTasks('grunt-phpcs');

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.

	//grunt.registerTask('default', ['watch']);
	grunt.registerTask('default', ['jshint', 'jsbeautifier', 'sasslint', 'concat', 'uglify', 'imagemin', 'sass', 'autoprefixer', 'cssmin', 'mochaTest', 'phpcs', 'bootlint']);
};
