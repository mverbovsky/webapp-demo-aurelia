import {Router, RouterConfiguration} from 'aurelia-router';
import {LogManager} from 'aurelia-framework';

const logger = LogManager.getLogger('app');

export class App {

  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    this.router = router;
    config.title = 'Demo App';
    config.options.pushState = false;
    // lze pouzit pouze pokud by se upravil server
    // config.options.pushState = ;
    config.map([
      { route: ['', 'home'], moduleId: './routes/index', name: 'home' },
      { route: 'persons', moduleId: './routes/person-table', name: 'persons' },
      { route: ['persons/:id','persons/new'],  moduleId: './routes/person-detail', name:'personDetail' }
    ]);
    config.mapUnknownRoutes('./routes/not-found');
  }

}
