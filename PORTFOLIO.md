# Interactieve portfolio-demo's

De gedeelde lijst in `scripts/portfolio-data.mjs` voedt zowel de selectie op de homepage als `/work`. Studio Kleur en Verf & Vorm zijn fictieve websiteconcepten van Manolinq, geen betalende klanten. De kaarten tonen een volledige desktop-screenshot, de sector, de aangeleverde omschrijving, de badge **Interactieve demo**, het label **Websiteconcept** en **Bekijk live demo**. Afbeelding en knop openen dezelfde HTTPS-bestemming met `target="_blank" rel="noopener noreferrer"`. De homepage verwijst ook naar `/work`.

## Screenshots vernieuwen

`node scripts/capture-portfolio.mjs` bezoekt de live URL's met Playwright/Chrome. Sharp moet lokaal beschikbaar zijn, eventueel via `SHARP_PATH`. De bestaande projectdependencies zijn niet veranderd. De capture wacht op netwerk, H1, fonts en zichtbare afbeeldingen; er worden geen interface-elementen verwijderd of aanvragen verstuurd. Niet-leesverzoeken worden geblokkeerd.

- Desktop: 1440 × 900, mobiele viewport: 390 × 844.
- WebP quality 90, zonder uitsnijden, uitrekken of visuele montage.
- Productiebeelden: `public/images/portfolio/`.
- Originele PNG-captures en HTTP-/afmetingenrapport: `review/portfolio/`.

De kaarten gebruiken de desktopbeelden op alle breedtes, met de natuurlijke 8:5-verhouding. De mobiele beelden zijn meegeleverd als aanvullende assets; ze worden niet naast de desktopbeelden in de kaart gestapeld, zodat het portfolio overzichtelijk blijft. De bestaande homepage-hero is ongewijzigd.

## Later een project toevoegen

Gebruik de velden van de bestaande gegevensobjecten: `id`, `type`, `title`, `industry`, `description`, `url` en `image` met `src`, `alt`, `width`, `height`. `mobileImage` is optioneel. Gebruik uitsluitend geverifieerde screenshots en een echte HTTPS-bestemming.

Een echte klant wordt alleen weergegeven met `type: 'client'` en `publicationApproved: true`. Zonder die expliciete publicatietoestemming wordt de kaart niet gerenderd. Pas bij echte klanten ook de algemene concepttoelichting aan. Voeg geen ongefundeerde resultaten of testimonials toe.

Na wijzigingen: `npm run render`, `npm run build`, `npm run lint:site`, `npm test`. De gerichte portfolioverificatie is `node tests/portfolio.mjs` met de lokale preview actief.
