import { ValidationRules } from 'aurelia-validation';
import * as moment from 'moment';

export enum Gender {
  Male, Female
}

export var Genders = [
  { type: Gender.Male, name: 'Muž' },
  { type: Gender.Female, name: 'Žena' }
];

export class Person {
  _id: string;
  _v: number;
  firstname: string;
  lastname: string;
  email: string;
  birthday: Date;
  gender: Gender;
}

ValidationRules.customRule(
  'date-before',
  (value, obj, date) => {
    //return value === null || value === undefined || value instanceof Date;
    if (date) {
      return moment(value).isBefore(date);
    }
    return moment(value).isBefore();
  },
  `\${$displayName} nesmí být zadané do budoucnosti.`
);

export const PersonValidationRules = ValidationRules
  .ensure((p: Person) => p.firstname)
    .required().withMessage('Jméno je povinný údaj.')
    .maxLength(50).withMessage(`Jméno nemůže být delší jak \${$config.length}.`)
  .ensure((p: Person) => p.lastname)
    .required().withMessage('Příjmení je povinný údaj.')
    .maxLength(80).withMessage(`Příjmení nemůže být delší jak \${$config.length}.`)
  .ensure((p: Person) => p.email)
    .required().withMessage('Email je povinný údaj.')
    .email().withMessage('Email není ve správném formátu.')
    .maxLength(256).withMessage(`Email nemůže být delší jak \${$config.length}.`)
  .ensure((p: Person) => p.birthday).displayName('Datum narození')
    .required().withMessage('Datum narození je povinný údaj.')
    .satisfiesRule('date-before')
  .ensure((p: Person) => p.gender)
    .required().withMessage('Pohlaví je povinný údaj.')
  .rules;

