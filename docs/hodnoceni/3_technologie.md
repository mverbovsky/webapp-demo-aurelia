# Technologie
### Technologická složitost/architektura
> O jaký typ frameworku se jedná? (MVC, MVVM...) <br>
> Jak technologicky složitý je framework /knihovna?

UI framework primárně určený pro vývoj SPA aplikací. Jedná se o soubor knihoven, které společně tvoří UI framework. Díky tomu, že je složený z dílčích knihoven, tak je možné v projektu používat jenom ty, které je opravdu zapotřebí, případně některé části nahradit nějakou alternativou.

Doporučená architektura je MVVM, ale nic nebrání použít jiný MV*.

Nejedná se o monolitický framework, ale o soubor knihoven/modulů, které lze skládat dohromady podle potřeby.

### Standardy/technologie
> Jaké standardy/technologie používá? (HTML5, ES2016, WebComponents, REST...) <br>
> Používá aktuální technologie? <br>
> Jaké standardy/technologie podporuje?

Jazyk
- Framework je napsaný v ES 2015 a ES 2016 a plně podporuje Typescript.

Web Components
- Plně podporuje Web Componenty (https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- umožňuje použít Web Componenty třetích stran (např. Polymer - http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/integrating-with-polymer). 
- V budoucnu je plánováno, že Aurelia Components půjdou exportovat jako Web Componenty.

Aurelia-fetch-client
- Knihovna pro HTTP komunikaci postavená na Fetch specifikaci
- Fetch specifikace - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- Není finální specifikace

Přehled - http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/technical-benefits/1
	
### Bezpečnost
> Zranitelnosti? <br>
> Jakým typům útoků se umí bránit? <br>
> Validace formulářů?
