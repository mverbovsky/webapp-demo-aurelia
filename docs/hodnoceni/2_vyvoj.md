# Vývoj
### Učící křivka
> Doba, která je potřeba pro "naučení se/ovládnutí" daného frameworku/knihovny. <br>
> Jak dlouho bude trvat, než vývojář bez znalostí bude schopen vyvíjet/používat? <br>
> Co všechno je potřeba se naučit? <br>

- modulární MV* framework (doporučené je MVVM) podobný Angular 2
- staví na filozofii convention over configuration. Díky tomu lze psát rychleji, čistěji a za použití méně kódu.
- Pro psaní je potřeba znát ECMAScript 2016/2015 nebo Typescript.
- základní naučení frameworku je celkem rychlé. 

### Rychlost vývoje
> Jak rychle je možné vytvořit vývojové prostředí? <br>
> Jak rychle je možné vytvoření nového projektu? <br>

Vývoj
- convention over configuration - rychlejší vývoj, méně psaní
- Modulární
- Podpora ES6 a Typescript
- CLI - rychlé vytvoření nového projektu

Aurelia CLI
- https://github.com/aurelia/cli
- http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/the-aurelia-cli
- Není finální verze, tj. stále ve vývoji a některé věci ještě nejsou funkční, např. práce s fonty - https://github.com/aurelia/cli/issues/248
- Vytvoření nového projektu je rychlé a je již definovaná doporučená struktura projektu

Alternativy
Webpack
- http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/setup-webpack

JSPM
- http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/setup-jspm

### Testování
> Testy jsou důležitou součástí vývoj a proto je podpora různých druhů testů - jednotkové, akceptační, zátěžové - důležitým kritériem při volbě. Podpora může být přímá, kdy daný framework/knihovna již přímo podporuje testy, a nebo nepřímá, kdy lze jednoduchým způsobem podporu testů přidat.
> Jaká je podpora psaní testů (jednotkových, akceptačních, integračních, zátěžových)?

Jednotkové testy 
- http://aurelia.io/hub.html#/doc/article/aurelia/testing/latest/testing-components/1
- Aurelia-testing - https://github.com/aurelia/testing - pomáhá pro izolované testování komponent
- Pro testování lze použít kterýkoliv z testovacích frameworků (Jasmine...).

E2E testy
- http://aurelia.io/hub.html#/doc/article/aurelia/testing/latest/end-to-end-testing
- Testování oproti scénářům 
- Protractor - http://www.protractortest.org/#/

### Debug
> Lze debugovat? <br>
> Jaké nástroje pro debug podporuje/lze použít?

Debug je stejný, jak u ostatních JS frameworků.

Chrome extension 
- https://chrome.google.com/webstore/detail/aurelia-context/cghchmoikhedpkkkdnljcfhikedoemma
- Extends the Developer Tools, adding a sidebar that displays the Aurelia observer data associated with the selected DOM element.

### Rozšiřitelnost
> Lze rozšiřovat framework/knihovnu o knihovny třetích stran? <br>
> Jak složité je případné rozšíření implementovat?

Dle autorů - http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/what-is-aurelia/3

Přehled pluginů - https://github.com/behzad888/awesome-aurelia#aurelia-plugins

Oficiální UI komponenty
- Aurelia Interface
- http://eisenbergeffect.bluespire.com/aurelia-interface-update/
- Zatím není oznámené datum vydání
- Mělo by se jednat komerční komponenty (ale část by měla být i volně přístupná)

Update 15.12.2016
- Aurelia Interface je zrušen a je nahrazen Aurelia UI 
- http://blog.aurelia.io/2016/11/04/introducing-aurelia-ux/
- https://github.com/aurelia/ux

