import { autoinject, computedFrom, LogManager } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import { DialogService } from 'aurelia-dialog';
import { Person } from '../model/person';
import { PersonService } from '../services/person-service';
import { MessageDialog } from '../resources/dialogs/message-dialog';

const logger = LogManager.getLogger('person-table');

@autoinject
export class PersonTable {
    persons: Person[];
    selectedPersonId: string;
    title: string = 'Osoby';

    constructor(private personApi: PersonService,
        private router: Router,
        private dialogService: DialogService) { }

    created() {
        this.personApi.getAll().then(data => this.persons = data);
    }

    select(person: Person): boolean {
        logger.debug('select person', person);
        this.selectedPersonId = person ? person._id : null;
        return true;
    }

    create() {
        this.router.navigate('persons/new');
    }

    detail() {
        this.router.navigate(`persons/${this.selectedPersonId}`);
    }

    delete() {
        this.dialogService.open({ viewModel: MessageDialog, model: 'Opravdu chcete vybraný záznam vymazat?' }).then(response => {
            if (!response.wasCancelled) {
                logger.debug('ano');
                this.personApi.delete(this.selectedPerson).then(response => {
                    let index = this.persons.indexOf(this.selectedPerson);
                    if (index > -1) {
                        this.persons.splice(index, 1);
                    }
                    this.selectedPersonId = null;
                });
            } else {
                logger.debug('ne');
            }
            logger.debug(response.output);
        });
    }

    @computedFrom('selectedPersonId')
    get selectedPerson(): Person {
        return this.persons.find((value, index) => {
            return value._id === this.selectedPersonId;
        });
    }

    get createEnabled(): boolean {
        return true;
    }

    @computedFrom('selectedPersonId')
    get detailEnabled(): boolean {
        return this.selectedPersonId != null;
    }

    @computedFrom('selectedPersonId')
    get deleteEnabled(): boolean {
        return this.selectedPersonId != null;
    }

}

