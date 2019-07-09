const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const ts = require("gulp-typescript");


function javascript() {
  const tsProject = ts.createProject("ultimate/web/tsconfig.json");

  return gulp.src("ultimate/web/src/**/*.tsx")
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(babel({
      presets: [
        ["@babel/preset-env", {
          targets: {
            "electron": "5.0.1"
          }
        }],
        ["@babel/preset-react", {
          targets: {
            "electron": "5.0.1"
          }
        }],
      ]
    }))
    .pipe(uglify())
    .pipe(concat("bundle.min.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build/web"));
}

function assets() {
  return gulp.src("ultimate/web/public/*")
    .pipe(gulp.dest("build/web"));
}

module.exports = {
  "build-web": gulp.parallel(javascript, assets),
};