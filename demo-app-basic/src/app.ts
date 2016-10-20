import {autoinject, LogManager} from 'aurelia-framework';
import {EventAggregator, Subscription} from 'aurelia-event-aggregator';
import {Person} from './model/person';
import {PersonService} from './services/person-service';

const logger = LogManager.getLogger('app');

// http://aurelia.io/hub.html#/doc/article/aurelia/dependency-injection/latest/dependency-injection-basics
@autoinject
export class App {
  persons: Person[];
  selectedPerson: Person;

  message: Person;

  createEnabled: boolean = true;
  saveEnabled: boolean = false;
  deleteEnabled: boolean = false;

  subSelect: Subscription;
  subCreate: Subscription;
  subSave: Subscription;
  subDelete: Subscription;

  constructor(private personService: PersonService,
              private eventAggregator: EventAggregator) {

    this.message = new Person();
    this.message.firstname = 'firstname';
    this.message.lastname = 'lastname';
  }
  // components lifecycle - http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/creating-components/3
  created() {
    this.personService.getAll().then(data => this.persons = data);
  }

  attached() {
    this.subSelect = this.eventAggregator.subscribe('select-person',
      payload => {
        logger.debug('select-person');
        logger.debug('persons', this.persons);
        logger.debug('message', this.message);
        this.setSelectedPerson(payload);
      });

    this.subCreate = this.eventAggregator.subscribe('create-person', () => {
      logger.debug('create-person');
      let newPerson = new Person();
      newPerson.firstname = '';
      newPerson.lastname = '';
      newPerson.email = '';
      this.setSelectedPerson(newPerson);
    });

    this.subSave = this.eventAggregator.subscribe('save-person', () => {
      logger.debug('save-person');
      logger.debug('selected-person', this.selectedPerson);
      this.personService.save(this.selectedPerson).then(data => {
        let index = this.persons.indexOf(this.selectedPerson);
        if (index == -1) {
          this.persons.push(data);
        }
        this.setSelectedPerson(null);
      });
    });

    this.subDelete = this.eventAggregator.subscribe('delete-person', () => {
      logger.debug('delete-person');
      this.personService.delete(this.selectedPerson).then(() => {
        let index = this.persons.indexOf(this.selectedPerson);
        if (index > -1) {
          this.persons.splice(index, 1);
        }
        this.setSelectedPerson(null);
      });

    });
  }

  detached() {
    this.subSelect.dispose();
    this.subCreate.dispose();
    this.subSave.dispose();
    this.subDelete.dispose();
  }

  setSelectedPerson(person: Person) {
    if (person) {
      this.selectedPerson = person;
      if (person._id) {
        this.createEnabled = true;
        this.deleteEnabled = true;
        this.saveEnabled = true;
      } else {
        this.createEnabled = false;
        this.deleteEnabled = false;
        this.saveEnabled = true;
      }
    } else {
      this.selectedPerson = null;
      this.createEnabled = true;
      this.deleteEnabled = false;
      this.saveEnabled = false;
    }
  }

  valueChangedSelectedPerson(newValue) {
    logger.debug('selected-person oldValue', this.selectedPerson);
    logger.debug('selected-person newValue', newValue);
  }

}
