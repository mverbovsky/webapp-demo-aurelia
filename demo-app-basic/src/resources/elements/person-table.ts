import {autoinject, bindable, LogManager} from 'aurelia-framework';
import {EventAggregator, Subscription} from 'aurelia-event-aggregator';
import {Person} from '../../model/person';

const logger = LogManager.getLogger('person-table');

@autoinject
export class PersonTableCustomElement {
    @bindable value: Person[];
    @bindable message: Person;

    selectedPersonId: string;
    subCreate: Subscription;
    subSave: Subscription;
    subDelete: Subscription;

    constructor(private eventAggregator: EventAggregator) { }

    select(person: Person): boolean {
        logger.debug('select person', person);

        logger.debug('message oldValue', this.message);

        if (person) {
            this.message.firstname = person.firstname;
            this.message.lastname = person.lastname;
        }

        logger.debug('message newValue', this.message);

        this.selectedPersonId = person ? person._id : null;

        this.eventAggregator.publish('select-person', person);
        return true;
    }

    attached() {
        this.subCreate = this.eventAggregator.subscribe('create-person', () => {
            logger.debug('create-person');
            this.selectedPersonId = null;
        });
        this.subSave = this.eventAggregator.subscribe('save-person', () => {
            logger.debug('save-person');
            this.selectedPersonId = null;
        });
        this.subDelete = this.eventAggregator.subscribe('delete-person', () => {
            logger.debug('delete-person');
            this.selectedPersonId = null;
        });
    }

    detached() {
        this.subCreate.dispose();
        this.subSave.dispose();
        this.subDelete.dispose();
    }

}

