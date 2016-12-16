import * as gulp from 'gulp';
import * as merge from 'merge-stream';
import * as changedInPlace from 'gulp-changed-in-place';
import * as project from '../aurelia.json';
import * as path from 'path';

export default function processBootstrapFonts() {

  let source = 'node_modules/bootstrap/dist';

  let taskFonts = gulp.src(`${source}/fonts/*`)
    .pipe(changedInPlace({firstPass:true}))
    .pipe(gulp.dest(`${project.platform.output}/fonts`));

  return merge(taskFonts);
}