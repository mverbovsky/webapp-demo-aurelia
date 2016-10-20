import {App} from '../../src/app';

class RouterStub {
  routes;
  unknownRoute;
  options = { pushState: false };
  
  configure(handler) {
    handler(this);
  }
  
  map(routes) {
    this.routes = routes;
  }

  mapUnknownRoutes(route) {
    this.unknownRoute = route;
  }
}

describe('the App module', () => {
  var sut, mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    sut = new App();
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('Demo App');
  });

  it('configures the router pushState=true', () => {
    expect(sut.router.options.pushState).toEqual(true);
  });

  it('should have a home route', () => {
    expect(sut.router.routes).toContain({ route: ['','home'], moduleId: './routes/index', name: 'home' });
  });

  it('should have a person-table route', () => {
     expect(sut.router.routes).toContain({ route: 'persons', moduleId: './routes/person-table', name: 'persons' });
  });

  it('should have a person-detail route', () => {
    expect(sut.router.routes).toContain({ route: ['persons/:id','persons/new'],  moduleId: './routes/person-detail', name:'personDetail' });
  });
});

