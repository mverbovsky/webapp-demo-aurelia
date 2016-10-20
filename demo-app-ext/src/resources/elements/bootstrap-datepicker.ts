import {bindable, bindingMode, autoinject, LogManager} from 'aurelia-framework';
import 'bootstrap-datepicker';

const logger = LogManager.getLogger('bootstrap-datepicker');

@autoinject
export class BootstrapDatepicker {
  @bindable dpOptions;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;

  constructor(private element: Element) {
  }

  attached() {
    let self = this;
    $(this.element).datepicker(this.dpOptions)
      .on('changeDate', e => {
        logger.debug('changeDate', e);
        this.value = (e as any).date;

        let changeDateEvent = new CustomEvent('changedate', {detail: {event: e}, bubbles: true});
        self.element.dispatchEvent(changeDateEvent);
      });
  }

  detached() {
    $(this.element).datepicker('destroy').off('changeDate');
  }

  valueChanged(newValue, oldValue) {
    logger.debug('valueChanged', newValue, oldValue);
  }

}
