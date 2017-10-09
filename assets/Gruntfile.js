module.exports = function (grunt) {

	// 1. All configuration goes here 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				sourceMap: true,
			},
			copy_libs_to_public: {
				src: '../public/js/production.libs.js',
				dest: '../public/js/production.libs.min.js'
			},
			copy_pages_to_public: {
				files: [{
					expand: true,
					src: '*.js',
					dest: '../public/js/pages/',
					cwd: './js/pages/',
					ext: '.min.js',
				}]
			},

		},
		concat: {
			'compile js scripts bundle': {
				src: [
					'js/vendor/*.js', // All vendor libs
					'js/libs/**/*.js', // All JS in the libs folder
					'js/libs/*.js', // All JS in the libs folder
				],
				dest: '../public/js/production.libs.js',
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
			all: ['Gruntfile.js', 'js/*.js', 'js/libs/**/*.js', 'js/pages/*.js'],
			beforeconcat: ['js/*.js', 'js/libs/*.js', 'js/pages/*.js'],
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
			'compiling scss': {
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
				tasks: ['prettysass', 'sasslint', 'sass', 'uglify'],

			},
			javascript: {
				files: ['js/*.js', 'js/libs/**/*.js', 'js/vendor/*.js', "tests/*.js"],
				tasks: ['jsbeautifier', 'jshint', 'concat', 'uglify', 'mochaTest'],
				options: {
					spawn: false,
					livereload: true,
				},
			},
			javascript_pages: {
				files: ['js/pages/*.js'],
				tasks: ['jsbeautifier', 'jshint', 'uglify'],
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
			gruntfile: {
				files: ['Gruntfile.js', ],
				tasks: ['jsbeautifier', 'jshint'],
				options: {
					spawn: false,
				},
			},
			php: {
				files: ['../public/*.php'],
				tasks: ['phpcs']
			},
			test: {
				files: ['js/libs/**/*.js', 'tests/*.js'],
				tasks: ['mochaTest']
			},
		},
		prettysass: {
			options: {
				alphabetize: true,
				indent: 4
			},
			app: {
				src: ['scss/*.scss', 'scss/**/.scss']
			},
		},
		jsbeautifier: {
			files: ["Gruntfile.js", "js/**/*.js", "tests/*.js"],
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
	});

	// 3. Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-contrib-watch');

	// JS
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks("grunt-jsbeautifier");

	// JS Testing
	grunt.loadNpmTasks('grunt-mocha-test');

	// Css / SCSS
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-prettysass');
	grunt.loadNpmTasks('grunt-sass-lint');

	// PHP Testing
	grunt.loadNpmTasks('grunt-phpcs');

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default', ['jshint', 'jsbeautifier', 'sasslint', 'prettysass', 'concat', 'uglify', 'imagemin', 'sass', 'autoprefixer', 'mochaTest', 'phpcs', 'watch']);
};
