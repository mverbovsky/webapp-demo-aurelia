import { autoinject, computedFrom, LogManager } from 'aurelia-framework';
import { Router, RouterConfiguration, RoutableComponentCanDeactivate } from 'aurelia-router';
import { ValidationControllerFactory, ValidationController, validateTrigger, ValidationRules } from 'aurelia-validation';
import { DialogService, DialogResult } from 'aurelia-dialog';

import { Person, PersonValidationRules } from '../model/person';
import { PersonService } from '../services/person-service';
import { BootstrapFormValidationRenderer } from '../resources/validation/bootstrap-form-validation-renderer';
import { MessageDialog } from '../resources/dialogs/message-dialog';

import * as _ from 'lodash';

const logger = LogManager.getLogger('person-detail');

@autoinject
export class PersonDetail implements RoutableComponentCanDeactivate {

    person: Person;
    oldPerson: Person;
    validationController: ValidationController;
    title: string;

    private routeConfig;

    constructor(private personApi: PersonService,
        private router: Router,
        private validationControllerFactory: ValidationControllerFactory,
        private dialogService: DialogService) {
            
        this.validationController = validationControllerFactory.createForCurrentScope();
        this.validationController.addRenderer(new BootstrapFormValidationRenderer());
    }

    activate(params, routeConfig) {
        logger.debug('ID: ' + params.id);
        this.routeConfig = routeConfig;

        if (params.id) {
            this.loadPerson(params.id);
        } else {
            this.createPerson();
        }
    }

    cancel() {
        logger.debug('cancel', this.person);
        this.router.navigate('persons');
    }

    save() {
        this.validationController.validate().then(errors => {
            logger.debug('validation errors', errors);
            if (!errors || errors.length === 0) {
                this.personApi.save(this.person).then(response => {
                    this.router.navigate('persons');
                });
            }
        }).catch(reason => logger.debug('validation rejection', reason));
    }

    // pokud by se nepouzila anotace computedFrom, tak by se pro pocitanou hodnotu provadel dirty checking (vyhodnocovani v cyklu)
    @computedFrom('person.firstname', 'person.lastname')
    get fullname(): string {
        logger.debug('get fullname');
        if (this.person) {
            return `${this.person.firstname} ${this.person.lastname}`;
        }
        return '';
    }


    changed(): boolean {
        // https://lodash.com/
        let equal = _.isEqualWith(this.person, this.oldPerson,
            (value, other) => {
                if (!(value && other)) {
                    return false;
                }
                return value && other
                    && _.isEqual(value.firstname, other.firstname)
                    && _.isEqual(value.lastname, other.lastname)
                    && _.isEqual(value.email, other.email)
                    && _.isEqual(value.birthday, other.birthday)
                    && _.isEqual(value.gender, other.gender);
            });

        return !equal;
    }

    private addValidations(): void {
        this.validationController.addObject(this.person, PersonValidationRules);
    }

    private loadPerson(id: string) {
        this.personApi.get(id).then(person => {
            this.person = person;
            this.oldPerson = JSON.parse(JSON.stringify(person));
            this.addValidations();

            logger.debug('person', this.person);
            logger.debug('oldPerson', this.oldPerson);

            this.routeConfig.navModel.setTitle(this.fullname);
            this.title = `Detail osoby`;
        });
    }

    private createPerson(): void {
        let newPerson = new Person();
        newPerson.firstname = '';
        newPerson.lastname = '';
        newPerson.email = '';

        this.person = newPerson;
        this.addValidations();

        this.title = 'Nová osoba';
        this.routeConfig.navModel.setTitle('Nová osoba');
    }

    canDeactivate(): boolean | Promise<boolean> {
        if (this.changed()) {
            let promise = new Promise<boolean>((resolve) => {
            this.dialogService.open({ viewModel: MessageDialog, model: 'Provedené změny nebudou uloženy. Chcete pokračovat?' }).then(
                response => {
                    logger.debug(response.output);
                    if (!response.wasCancelled) {
                        logger.debug('ano');
                        resolve(true);
                    } else {
                        logger.debug('ne');
                        resolve(false);
                    }
                });
            });
            return promise;
        }
        return true;
    }

}

