import { Genders, Gender } from '../../model/person';
import { bindable, bindingMode } from 'aurelia-framework';

export class GenderSelect {
    private genders = Genders;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value: Gender;
}