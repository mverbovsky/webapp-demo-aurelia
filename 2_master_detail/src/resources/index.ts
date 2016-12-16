import {FrameworkConfiguration} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    './elements/bootstrap-datepicker', 
    './value-converters/date-format',
    './elements/gender-select']);
}
