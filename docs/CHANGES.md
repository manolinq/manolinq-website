# Gewijzigde bestanden

De machineleesbare vergelijking met het originele ZIP staat in `review/changed-files.json`. Geen oorspronkelijke bestanden zijn verwijderd. Alle oorspronkelijke broncode blijft beschikbaar in de back-up.

## Gewijzigd

- `index.html` — nieuwe homepage met conceptvisuals, diensten, persoonlijk portret en werkwijze.
- `work.html` — herbruikbare portfolio-presentatie met als concept gemarkeerde previews en de drie diensten.
- `pricing.html` — bestaande prijzen en prestaties in vernieuwde kaarten, heldere offertetoelichting en FAQ.
- `process.html` — Nederlandse uitleg van kennismaking, voorstel, ontwikkeling en goedgekeurde lancering.
- `contact.html` — vernieuwde formuliervelden, labels en statussen, bestaande veldnamen en waarden.
- `privacy.html` — volledige Nederlandse redactie van het bestaande beleid en responsive tabellen.
- `package.json` — expliciete statische build, preview-, render-, lint- en testcommando's; ontwikkeltools voor tests.
- `package-lock.json` — testtools toegevoegd; alle bestaande dependencyversies behouden.
- `public/_redirects` — specifieke bestaande routes; algemene SPA-fallback verwijderd.
- `public/sitemap.xml` — gelijkgetrokken met de root-sitemap en actieve productie-URL's.
- `readme.md` — lokale preview, onderhoud, tests en verwijzing naar overdracht.

## Toegevoegd

- `netlify.toml`, `.gitignore`, `404.html`, `public/_headers`.
- `public/styles/site.css` — gedeeld ontwerp, responsive gedrag, focus en reduced motion.
- `public/scripts/site.js`, `public/scripts/contact.js` — navigatie en bestaand formuliercontract met verbeterde presentatie.
- `public/brand/logo-primary.svg`, `logo-light.svg`, `logo-dark.svg`, `icon.svg`, `favicon.svg`, `social-preview.png`.
- `public/images/manolito-original.jpg`, `manolito.webp`, `manolito-small.webp`.
- `scripts/render-pages.mjs`, `privacy-content.mjs`, `build.mjs`, `serve.mjs` — beheer van de standalone pagina's en expliciete build.
- `scripts/prepare-assets.mjs` — eenmalige extractie van het originele portret; niet opnieuw uitvoeren op de nieuwe homepage.
- `scripts/test.mjs`, `check-netlify-bundle.mjs`, `package-review.mjs` — lokale verificatie en reviewpakket.
- `tests/verify.mjs`, `tests/accessibility.mjs`, `eslint.site.config.mjs`.
- `docs/ARCHITECTURE.md`, `docs/DELIVERY.md`, `docs/CHANGES.md`.
- `review/` — originele back-up, hashes, screenshots en testresultaten.
- `site-dist/` — expliciete gegenereerde publieke output; geen backendbron of reviewbestanden.

## Expliciet ongewijzigd

`netlify/functions/submit-lead.js`, de Supabase-migratie, de bestaande React-code in `src`, de historische `dist`, oorspronkelijke logo-assets, root `robots.txt` en root `sitemap.xml`. Geen omgevingsvariabelen of productiedata aangepast.
