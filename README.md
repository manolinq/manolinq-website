# Manolinq 2.0 — reviewversie

Redesign van de bestaande Manolinq-website. Niet gepubliceerd. Laatste gerichte verfijningen en verificatie: [FINAL-POLISH.md](docs/FINAL-POLISH.md).

## Lokaal bekijken

Open een terminal in deze map, met Node.js 22 of hoger:

```sh
npm ci
npm run build
npm run preview
```

Open http://127.0.0.1:4174. Het lokale voorbeeld verstuurt geen aanvragen naar de productie-integraties. Gebruik e-mail of WhatsApp alleen als je werkelijk contact wil opnemen.

## Bewerken

De productiepagina's zijn `index.html`, `work.html`, `pricing.html`, `process.html`, `contact.html` en `privacy.html`. De build kopieert ze en de gedeelde lokale assets naar `site-dist`.

Voor wijzigingen aan gedeelde onderdelen staan de templates in `scripts/render-pages.mjs`; het privacybeleid staat in `scripts/privacy-content.mjs`. Na templatewijzigingen: `npm run render`, vervolgens `npm run build`. Een render overschrijft de zes HTML-bestanden en `404.html`. Wijzig daarom teksten bij voorkeur in de templates. Styling: `public/styles/site.css`. Formuliergedrag: `public/scripts/contact.js`.

De oorspronkelijke React-bronnen in `src` en de meegeleverde oude `dist` zijn behouden, maar worden niet gebouwd of gepubliceerd. Gebruik uitsluitend de nieuwe Netlify-configuratie.

## Controleren

```sh
npm run build
npm run lint:site
npm test
```

`npm test` start zelf een tijdelijke lokale server op poort 4175, voert de browser-, formulier-, backendmock- en toegankelijkheidscontroles uit en stopt de server. Google Chrome moet geïnstalleerd zijn. Voor een andere Playwright-browser stel je `BROWSER_CHANNEL` in; voor Playwright Chromium installeer je eerst `npx playwright install chromium` en gebruik je `BROWSER_CHANNEL=chromium`. Screenshots en resultaten staan in `review`.

De oude commando's `npm run lint` en `npm run typecheck` horen bij de behouden React-code. Hun bestaande waarschuwingen en fouten zijn gedocumenteerd; ze zijn geen onderdeel van de nieuwe productiebuild.

## Oplevering en publicatie

- [Architectuurkeuze en inspectie](docs/ARCHITECTURE.md)
- [Volledig opleverrapport en Netlify-instructies](docs/DELIVERY.md)
- [Wijzigingenlijst](docs/CHANGES.md)
- [Exacte bestandenlijst](review/changed-files.json)
- [Originele back-up](review/Manolinq-original-2026-09-16.zip)

Publiceer pas na beoordeling door de eigenaar. Upload niet alleen `site-dist` via Netlify Drop: de bestaande serverfunctie moet deel uitmaken van dezelfde deployment.
