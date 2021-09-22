let project_folder = "dist";
let source_folder = "src";

let path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    fonts: project_folder + "/fonts/",
  },
  src: {
    html: [source_folder + "/**/*.html", "!" + source_folder + "/**/_*.html"],
    css: [source_folder + "/scss/**/*.scss"],
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}",
    fonts: source_folder + "/fonts/*.ttf",
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}",
  },
  clean: "./" + project_folder + "/",
};

const { src, dest } = require("gulp"),
  gulp = require("gulp"),
  browsersync = require("browser-sync").create(),
  del = require("del"),
  webpack = require("webpack-stream"),
  scss = require("gulp-sass")(require('sass'));

function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/",
    },
    port: 3000,
    notify: false,
  });
}

function html() {
  return src(path.src.html)
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

function images() {
  return src(path.src.img)
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}

function css() {
  return src(path.src.css)
      .pipe(
        scss({
          outputStyle: "expanded"
        })
      )
      .pipe(dest(path.build.css))
      .pipe(browsersync.stream())
}

function js() {
  return src("src/js/main.js")
      .pipe(webpack({
        mode: 'development',
        output: {
          filename: 'script.js'
        },
        watch: false,
        devtool: "source-map",
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'], 
                }
              }
            }
          ]
        }
      }))
      .pipe(dest(path.build.js))
      .pipe(browsersync.stream());
}

function watchFile(params) {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.css], css);
}

function clean() {
  return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(html, js, css, images));
let watch = gulp.parallel(build, watchFile, browserSync);

exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.clean = clean;
exports.watch = watch;
exports.build = build;
exports.default = watch;
