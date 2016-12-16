import * as gulp from 'gulp';
import * as merge from 'merge-stream';
import * as changedInPlace from 'gulp-changed-in-place';
import * as project from '../aurelia.json';
import * as path from 'path';

export default function processBootstrapFonts() {

  let taskCss = gulp.src(path.join('src/css/glyphicons.css'))
    .pipe(changedInPlace({firstPass:true}))
    .pipe(gulp.dest(path.join(project.platform.output, 'css')));

  let taskFonts = gulp.src('node_modules/bootstrap/dist/fonts/*')
    .pipe(changedInPlace({firstPass:true}))
    .pipe(gulp.dest(path.join(project.platform.output, 'fonts')));

  return merge(taskCss, taskFonts);
}