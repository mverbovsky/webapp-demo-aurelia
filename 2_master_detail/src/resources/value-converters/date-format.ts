import { LogManager } from 'aurelia-framework';
import * as moment from 'moment';

const logger = LogManager.getLogger('date-format');

export class DateFormatValueConverter {

    toView(value, format) {
        logger.debug('toView', value, format);
        if (value) {
            return moment(value).format(format);
        }
        return value;
    }

}