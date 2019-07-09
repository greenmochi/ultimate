const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const ts = require("gulp-typescript");


function compileWeb() {
  const webTsProject = ts.createProject("ultimate/web/tsconfig.json");

  return gulp.src("ultimate/web/src/**/*.tsx")
    .pipe(sourcemaps.init())
    .pipe(webTsProject())
    .pipe(babel({
      presets: ["@babel/preset-env", "@babel/preset-react"],
    }))
    .pipe(uglify())
    .pipe(concat("bundle.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build/web"));
}

module.exports = {
  "compile-web": compileWeb,
};