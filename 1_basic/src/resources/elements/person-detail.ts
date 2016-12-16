import {bindable, computedFrom, LogManager} from 'aurelia-framework';
import {Person} from '../../model/person';

var logger = LogManager.getLogger('person-detail');

export class PersonDetailCustomElement {
    @bindable value: Person;

    constructor() { }

    attached() {
        this.value = new Person();
        this.value.firstname = 'test';
    }

    // http://aurelia.io/hub.html#/doc/article/aurelia/binding/latest/binding-computed-properties
    // pokud by se nepouzila anotace computedFrom, tak by se pro pocitanou hodnotu provadel dirty checking (vyhodnocovani v cyklu)
    @computedFrom('person.firstname', 'person.lastname')
    get fullname(): string {
        logger.debug('get fullname');
        if (this.value) {
            return `${this.value.firstname} ${this.value.lastname}`;
        }
        return '';
    }
}

