import {Person} from '../model/person';
import {HttpClient, json} from 'aurelia-fetch-client';
import {LogManager, inject} from 'aurelia-framework';

var logger = LogManager.getLogger('person-service');

// http://aurelia.io/hub.html#/doc/article/aurelia/fetch-client/latest/http-services/2
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
@inject(HttpClient)
export class PersonService {
    constructor(private http: HttpClient) {
    }

    get(id: string): Promise<Person> {
        return this.http.fetch(`persons/${id}`)
            .then(response => response.json())
            .then(data => data as Person)
            .catch(this.handleError);
    }

    getAll(): Promise<Person[]> {
        return this.http.fetch('persons')
            .then(response => response.json())
            .then(data => data as Person[])
            .catch(this.handleError);
    }

    save(person: Person): Promise<Person> {
        if (person && person.id) {
            return this.update(person);
        }
        return this.create(person);
    }

    update(person: Person): Promise<Person> {
        return this.http.fetch(`persons/${person.id}`, {
            method: "PUT",
            body: json(person),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => data as Person)
            .catch(this.handleError);
    }

    create(person: Person): Promise<Person> {
        return this.http.fetch(`persons`, {
            method: "POST",
            body: json(person),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => data as Person)
            .catch(this.handleError);
    }

    delete(person: Person): Promise<boolean> {
        return this.http.fetch(`persons/${person.id}`, {
            method: "DELETE"
        }).then(response => response.json())
            .catch(this.handleError);
    }

    handleError(error: any): Promise<any> {
        logger.error(error);
        return Promise.reject(error.message || error);
    }

}