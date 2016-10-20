import {bindable, autoinject, LogManager} from 'aurelia-framework';
import {EventAggregator, Subscription} from 'aurelia-event-aggregator';

var logger = LogManager.getLogger('person-action');

@autoinject
export class PersonActionCustomElement {
    @bindable createEnabled: boolean;
    @bindable saveEnabled: boolean;
    @bindable deleteEnabled: boolean;

    constructor(private eventAggregator: EventAggregator) { 
        logger.debug('constructor');
    }

    create(): boolean {
        logger.debug('create');
        this.eventAggregator.publish('create-person');
        return true;
    }

    save(): boolean {
        logger.debug('save');
        this.eventAggregator.publish('save-person');
        return true;
    }

    delete(): boolean {
        logger.debug('delete');
        this.eventAggregator.publish('delete-person');
        return true;
    }

}

