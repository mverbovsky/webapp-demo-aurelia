import * as gulp from 'gulp';
import * as rename from 'gulp-rename';
import transpile from './transpile';
import processMarkup from './process-markup';
import processCSS from './process-css';
import {build} from 'aurelia-cli';
import * as project from '../aurelia.json';
import processBootstrapFonts from './prepare-bootstrap-fonts'; // here

export default gulp.series(
  readProjectConfiguration,
  gulp.parallel(
    transpile,
    processMarkup,
    processCSS,
    processBootstrapFonts
  ),
  writeBundles
);

function readProjectConfiguration() {
  return build.src(project);
}

function writeBundles() {
  return build.dest();
}
