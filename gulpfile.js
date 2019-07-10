const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const ts = require("gulp-typescript");


function javascript() {
  const tsProject = ts.createProject("ultimate/ui/tsconfig.json");

  return gulp.src("ultimate/ui/src/**/*.tsx")
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(babel({
      presets: [
        ["@babel/preset-env", {
          targets: {
            "electron": "5"
          }
        }],
        ["@babel/preset-react", {
          targets: {
            "electron": "5"
          }
        }],
      ]
    }))
    .pipe(uglify())
    .pipe(concat("bundle.min.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build/ui"));
}

function assets() {
  return gulp.src("ultimate/ui/public/*")
    .pipe(gulp.dest("build/ui"));
}

module.exports = {
  "build:ui": gulp.parallel(javascript, assets),
};