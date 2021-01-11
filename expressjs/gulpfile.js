const { src, dest, series, watch } = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json", { noImplicitAny: true });
const uglify = require("gulp-uglify");
const clean = require("gulp-clean");

function buildTs() {
  let result = src(["src/**/*.ts", "./typings/**/*.ts"]).pipe(tsProject());
  if (process.env.NODE_ENV) {
    return result.pipe(dest("dist"));
  } else {
    return result.pipe(uglify()).pipe(dest("dist"));
  }
}

function removeDistDir() {
  return src("./dist/*").pipe(clean({ force: true }));
}

/*  */
exports.build = series(removeDistDir, buildTs);
