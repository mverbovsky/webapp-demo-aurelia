# Webapp-demo - Aurelia
Jednoduchá webová aplikace implementována za použití frameworku [Aurelia](http://aurelia.io/). Projekt je postaven pomocí [Aureli CLI](https://github.com/aurelia/cli) a pro implementaci je použit [TypeScript](https://www.typescriptlang.org/).

## Instalace
```
npm install
```
## Build
```
au build
```
## Spuštění
```
au run
```
Pokud bychom chtěli změny v kódu automaticky nasazovat, pak se přidá parametr `--watch`.

## Popis
Vstupním bodem aplikace je atribut `aurelia-app` jehož hodnota je nastavena na modul `main`, který obsahuje konfiguraci frameworku a zároveň určuje HTML element, kde bude aplikace vykreslena. Pokud by nebyl uveden žádný modul s konfigurací, pak se framework pokusí načíst `app.js` a `app.html`, provede binding a vloží je DOMu.
```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>Demo App - Aurelia</title>
  </head>
  <!-- atribut definujici pocatecni bod aplikace -->
  <body aurelia-app="main">
    <script src="scripts/vendor-bundle.js" data-main="aurelia-bootstrapper"></script>
  </body>
</html>
```
### Konfigurace
```typescript
// main.ts
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
```
Konfigurace frameworku aplikace se provede v několika krocích:
- `standardConfiguration()` - konfigurace vybraných základních pluginů (binding, resource, event aggregator, history, router)
- `feature('resources')` - konfigurace interních pluginů z `resources`
- `developmentLogging()` - konfigurace logování
- `plugin('aurelia-testing')` - konfigurace pluginu pro testování
- `registerInstance(HttpClient, http)` - registrace instance `HttpClient` do kontejneru pro DI (pozn. jako http klient je použito [Fetch API](#fetch-api), což v aurelii odpovídá modulu `aurelia-fetch-client`)

Po konfiguraci se provede samotné spuštění aplikace
```typescript
aurelia.start().then(() => aurelia.setRoot());
```
které kromě načtení a spuštění samotného frameworku provede i načtení a vykreslení rootovské komponenty, která v tomto případě, díky přístupu convention over configuration, odpovídá `app.ts` a `app.html` 

### Komponenty / elementy
#### `app.ts`
Rootovská komponenta, která 

### Service

#### Fetch API
Fetch API je nový standard definující API pro práci se zdroji, který by měl nahradit existující `XMLHttpRequest`.

Více informací:
- https://fetch.spec.whatwg.org/
- https://developer.mozilla.org/en/docs/Web/API/Fetch_API
- https://davidwalsh.name/fetch
- https://developers.google.com/web/updates/2015/03/introduction-to-fetch

Pokud webový prohlížeč tento standard nepodporuje, je potřeba použít polyfill (např. https://github.com/github/fetch).

