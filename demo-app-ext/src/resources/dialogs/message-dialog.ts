import { autoinject, LogManager } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

const logger = LogManager.getLogger('message-dialog');

@autoinject
export class MessageDialog {

    private message: string;

    constructor(private controller: DialogController) { }

    activate(message) {
        logger.debug('activate', message);
        this.message = message;
    }
    
}