'use strict';

module.exports = function(grunt){
	grunt.loadNpmTasks('grunt-sass');
	grunt.initConfig({
		sass: {
			build: {
				options: 	{ outputStyle: 'compact' },
				files: 		{ 'style.css': 'style.scss' }
			}
		}
	});
	grunt.registerTask('default', 	['sass']);
};