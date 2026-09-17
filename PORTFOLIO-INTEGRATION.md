# Portfolio-integratie — 17 september 2026

Status: lokaal afgerond, niet gepubliceerd. De opnieuw aangeleverde `Manolinq-2.0-huidige versie.zip` is gecontroleerd: de zestien kernbestanden zijn identiek aan de eerder vastgelegde basis vóór de portfolio-integratie. Alle overige bronbestanden buiten het portfolio komen overeen met de werkmap. Er zijn geen nieuwere wijzigingen overschreven. De vier live screenshots zijn voor deze oplevering opnieuw gegenereerd.

## Resultaat

Studio Kleur en Verf & Vorm vervangen de twee oude portfolio-illustraties op de homepage en `/work`. Beide blijven duidelijk fictieve websiteconcepten van Manolinq. De exacte aangeleverde omschrijvingen en sectoren zijn gebruikt. Elke kaart bevat een echte desktop-screenshot, de naam, sector, badge **Interactieve demo**, label **Websiteconcept** en knop **Bekijk live demo**. Knop en afbeelding openen de juiste Vercel-URL in een nieuw tabblad met `noopener noreferrer`.

De homepage verwijst naar `/work`; de hero en overige secties zijn niet opnieuw ontworpen. Het bestaande illustratieve beeld in de hero blijft behouden zoals gevraagd. De gezamenlijke projectgegevens staan in `scripts/portfolio-data.mjs`.

## Echte screenshots

Beide URL's leverden HTTP 200 en konden met Playwright/Chrome worden vastgelegd. Er waren geen screenshotgeneratiefouten of onbeschikbare demo's; er is geen fallback gebruikt. Er is gewacht op fonts, essentiële inhoud en zichtbare afbeeldingen. Demobanners en mobiele interface-elementen zijn behouden, zonder interacties te verzinnen of aanvragen te versturen.

| Bestand in `public/images/portfolio/` | Afmetingen | Bytes |
| --- | --- | ---: |
| studio-kleur-desktop.webp | 1440 × 900 | 73.062 |
| studio-kleur-mobile.webp | 390 × 844 | 46.906 |
| verf-vorm-desktop.webp | 1440 × 900 | 76.620 |
| verf-vorm-mobile.webp | 390 × 844 | 47.854 |

WebP kwaliteit 90, zonder resizing of uitsnijden. De kaarten behouden de natuurlijke 8:5-verhouding. Mobiele screenshots zijn meegeleverd als aanvullende assets; de kaarten blijven rustig met één desktoppreview. Herkomst en ruwe PNG's staan in `review/portfolio/capture-report.json` en dezelfde reviewmap.

## Verificatie

- `npm run render` en `npm run build`: geslaagd; templates, gegenereerde HTML en productie-uitvoer synchroon.
- `npm run lint:site` en de bestaande `npm test`: geslaagd. 54 pagina/breedte-controles, vijf geïsoleerde formuliercontroles, vier backendcontroles en twaalf Axe-scans zonder gedetecteerde overtredingen.
- `node tests/portfolio.mjs`: homepage en `/work` op 320, 390, 430, 768 en 1440 px. Geen horizontale pagina-overloop, vervormde screenshots of overlappende kaartonderdelen. Omschrijvingen 15 px; knoppen minimaal 48 px hoog.
- Alle acht combinaties van pagina, project en klikbare knop/afbeelding openen de juiste echte demo in een nieuw tabblad, zonder `window.opener`.
- Alle vier WebP-bestanden laden via de productiepreview met HTTP 200 en de juiste intrinsieke afmetingen.
- Homepage-hero en SEO-heads zijn exact gelijk aan de aangeleverde versie. Twaalf overige bestanden, waaronder contactpagina, formuliercode, Netlify-configuratie en Function, zijn byte-identiek. De build controleert daarnaast de eerder vastgelegde beschermde backend- en migratiehashes.
- Geen Supabase-, Telegram-, omgevingsvariabele-, formulierpayload- of databasewijzigingen. Geen echte leads verstuurd. Niet gepubliceerd.

## Gewijzigde bestanden

- `scripts/render-pages.mjs`: gedeelde screenshotkaart en portfolio-inhoud.
- `scripts/portfolio-data.mjs`: nieuwe centrale projectlijst.
- `scripts/capture-portfolio.mjs`: reproduceerbare read-only live captures.
- `public/styles/site.css`: uitsluitend CSS voor de nieuwe portfolio-kaarten.
- `public/images/portfolio/*.webp`: vier nieuwe screenshotassets.
- `index.html`, `work.html` en overeenkomstige `site-dist`-pagina's/assets: gegenereerde output.
- `tests/portfolio.mjs`: gerichte regressie-, link- en assetcontroles; `tests/polish-review.mjs`: verwacht nieuw demo-label.
- `docs/PORTFOLIO.md`, dit rapport en `review/portfolio/`: onderhoudsinstructies, screenshots en verificatiebewijs. Bestaande build-/testreviewrapporten zijn ververst.

Bijgewerkte volledige pagina-screenshots: `review/portfolio/manolinq-home-{390,1440}.png` en `manolinq-work-{390,1440}.png`. Detailbeelden van het portfolio zijn beschikbaar voor alle vijf breedtes als `manolinq-{home,work}-portfolio-{breedte}.png`.
