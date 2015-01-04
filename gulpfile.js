
// Load plugins
var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')({ camelize: true }),
	browserSync = require('browser-sync');

gulp.task('server', function() {
	browserSync({
		server: {
			baseDir: 'build/'
		}
	});
});

// HTMLの出力
gulp.task('html',function(){
	gulp.src('assets/**/*.html')
		.pipe(plugins.plumber())
		.pipe(gulp.dest('build/'))
		.pipe(browserSync.reload({stream:true}));
});

// Sass(SCSS)ビルドタスク
gulp.task('sassmin', function () {
	gulp.src('assets/scss/style.scss')
		.pipe(plugins.plumber())
		//SASSコンパイル
		.pipe(plugins.sass({
			style : 'nested'
		}))
		//ベンダープレフィックス挿入
		.pipe(plugins.autoprefixer([
			'last 2 version', 'ie 8'
		]))
		//minify
		.pipe(plugins.cssmin())
		//コンパイル後出力ファイル先の指定
		.pipe(gulp.dest('build/css/'))
		.pipe(browserSync.reload({stream:true}));
});

// .jsファイルの圧縮
gulp.task('jsmin', function(){
	gulp.src('assets/**/*.js')
		.pipe(plugins.plumber())
		//minify
		.pipe(plugins.jsmin())
		//出力ファイル先の指定
		.pipe(gulp.dest('build/js'))
		.pipe(browserSync.reload({stream:true}));
});

// default(サーバー立ち上げて自動更新)
gulp.task('default', ['server'], function() {
    gulp.watch(['assets/**/*.html'], ['html']);
    gulp.watch(['assets/**/*.js'], ['jsmin']);
    gulp.watch(['assets/**/*.scss'], ['sassmin']);
});