// Dependencies
import gulp              from 'gulp';
import path              from 'path';
import rename            from 'gulp-rename';
import connectPHP        from 'gulp-connect-php';
import plumber           from 'gulp-plumber';
import notify            from 'gulp-notify';
import sass              from 'gulp-sass';
import postcss           from 'gulp-postcss';
import postcssScss       from 'postcss-scss';
import postcssBemLinter  from 'postcss-bem-linter';
import autoprefixer      from 'autoprefixer';
import sourcemaps        from 'gulp-sourcemaps';
import webpack           from 'webpack';
import webpackStream     from 'webpack-stream';
import webpackConfigDEV  from './webpack.dev';
import webpackConfigPROD from './webpack.prod';
import { create as browserSyncCreate } from 'browser-sync';



// Settings
const basePath = __dirname;
const sitePath = path.resolve(__dirname);
const nodePath = path.resolve(__dirname, 'node_modules');
const destPath = path.resolve(__dirname, 'dist');

const baseName = path.basename(basePath);

const browserSync = browserSyncCreate();
const browserSyncProxy = `${baseName}.test`;

const bemUtilitySelectors = /^\.u-/;
const bemIgnoreSelectors = [
  /\.container/,
  /\.row/,
  /\.col/,
  /#{\$\S+}/,
  /\[class(\*|\^|\$)="/
];



// TASKS
// =======================================================================

// Plumber
const plumberHandler = {
  errorHandler: notify.onError({
    title: 'Gulp Error',
    message: '<%= error.message %>'
  })
};

// Reload
function reload(done) {
  browserSync.reload();
  done();
}

// SCSS
function scss() {
  return gulp.src(`${sitePath}/scss/**/*.scss`)
    .pipe(plumber(plumberHandler))
    .pipe(postcss([
      postcssBemLinter({
        preset: 'bem',
        utilitySelectors: bemUtilitySelectors,
        ignoreSelectors: bemIgnoreSelectors
      })
    ], {
      syntax: postcssScss
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      precision: 10,
      includePaths: [nodePath]
    }))
    .pipe(postcss([
      autoprefixer({ cascade: false })
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(destPath))
    .pipe(browserSync.stream());
}

function scss_prod() {
  return gulp.src(`${sitePath}/scss/**/*.scss`)
    .pipe(sass({
      precision: 10,
      outputStyle: 'compressed',
      includePaths: [nodePath]
    }))
    .pipe(postcss([
      autoprefixer({ cascade: false })
    ]))
    .pipe(gulp.dest(destPath));
}

// JS
function js() {
  return gulp.src(`${sitePath}/js/main.js`)
    .pipe(plumber(plumberHandler))
    .pipe(webpackStream(webpackConfigDEV, webpack))
    .pipe(gulp.dest(destPath));
}

function js_prod() {
  return gulp.src(`${sitePath}/js/main.js`)
    .pipe(webpackStream(webpackConfigPROD, webpack))
    .pipe(gulp.dest(destPath));
}

// Watch
function watch_files() {
  watch(`${sitePath}/scss/**/*.scss`, scss);
  watch(`${sitePath}/js/**/*.js`, gulp.series(js, reload));
  watch(`${sitePath}/**/*.twig`, reload);
  watch(`${sitePath}/**/*.php`, reload);
  watch(`${sitePath}/**/*.html`, reload);
}

// Copy 'pre-commit' git hook
function copy_git_pre_commit_hook() {
  return gulp.src('git-pre-commit-hook')
    .pipe(rename('pre-commit'))
    .pipe(gulp.dest('./.git/hooks'));
}

// PHP
function php_fn() {
  connectPHP.server({
    port: 8000,
    open: false,
    hostname: '127.0.0.1',
    base: basePath,
    stdio: 'ignore'
  }, () => {
    browserSync.init({
      ghostMode: false,
      ui: false,
      notify: false,
      proxy: '127.0.0.1:8000'
    });
  });
}

// Proxy
function proxy_fn() {
  browserSync.init({
    ghostMode: false,
    ui: false,
    notify: false,
    proxy: browserSyncProxy
  });
}


const php = gulp.parallel(php_fn, watch_files);
const proxy = gulp.parallel(proxy_fn, watch_files);
const build = gulp.parallel(scss_prod, js_prod);


export {
  copy_git_pre_commit_hook,
  scss_prod,
  js_prod,
  php,
  proxy,
  build
}

export default proxy;
