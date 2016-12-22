import {Aurelia, LogManager} from 'aurelia-framework'
import {HttpClient} from 'aurelia-fetch-client';
import environment from './environment';
import 'fetch';

const REST_API_URL = 'http://hndocker.oksystem.local:58090/api/';
const logger = LogManager.getLogger('app');

//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
(<any>Promise).config({
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  let http = new HttpClient();
  http.configure(config => {
    config
      .withBaseUrl(REST_API_URL)
      .withInterceptor({
        request(request) {
          logger.debug(`Requesting ${request.method} ${request.url}`);
          return request;
        },
        response(response) {
          logger.debug(`Received ${response.status} ${response.url}`);
          return response;
        }
      });
  });
  aurelia.container.registerInstance(HttpClient, http);
  // spusteni aplikace - root komponenta - default app.js/app.html
  aurelia.start().then(() => aurelia.setRoot());
}

