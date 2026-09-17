# Manolinq 2.0 — opleverrapport

Datum: 17 september 2026. Status: lokale reviewversie, niet gepubliceerd. Aanvullende eindverfijning en actuele verificatie: [FINAL-POLISH.md](FINAL-POLISH.md).

## Wat is gerealiseerd

De zes bestaande productiepagina's hebben een samenhangend donker ontwerp met Manrope, heldere blauwe accenten, verfijnde knoppen, meer witruimte en Nederlandstalige inhoud. De homepage bevat een nieuwe hero, twee als concept gemarkeerde projectpreviews, diensten, het persoonlijke verhaal van Manolito en een compacte uitleg van de werkwijze. Het portret is uit de oorspronkelijke base64-data geëxtraheerd; de originele JPEG van 66.850 bytes blijft behouden. De responsive WebP-versies zijn 27.898 en 10.786 bytes.

De geometrische M en het Manolinq-woordmerk zijn beschikbaar als horizontaal licht, donker en primair SVG-logo, compact SVG-icoon en SVG-favicon. Een lokale PNG van 1200 × 630 verzorgt de sociale preview. Het logo is een uitgewerkt voorstel ter goedkeuring door de eigenaar.

De projectpreviews zijn zelfgemaakte HTML/SVG-ontwerpstudies, geen screenshots van klantprojecten. De tijdelijke conceptnamen vertegenwoordigen geen echte opdrachtgevers. A&T Ophalingen, de bedrijfsbranding en de demo-URL worden niet op de nieuwe publieke site genoemd. Het herbruikbare `projectCard`-onderdeel en de `projects`-lijst maken later toevoegen mogelijk, zodra publicatie is toegestaan.

De prijzen en concrete inbegrepen prestaties van de live standalone-pagina blijven behouden: Starter vanaf €500, Business vanaf €750, Website + AI vanaf €1.250; respectievelijk 1, 2 en 3 revisierondes; 30 dagen ondersteuning bij lancering uitsluitend in het AI-pakket. Er zijn geen nieuwe betaalvoorwaarden toegevoegd. Onbevestigde commerciële responstijden, decoratieve statistieken, de oude slogan en niet-onderbouwde populariteitsclaims zijn verwijderd.

De privacytekst is in het Nederlands overgenomen met behoud van de inhoudelijke structuur, rechten en bewaartermijnen. De oude commerciële belofte om binnen 24 uur te antwoorden is verwijderd; de wettelijke termijnen uit het aangeleverde beleid zijn behouden. Dit is geen juridische of AVG-conformiteitsbeoordeling.

## Architectuur

Read-only HTTP-inspectie bevestigde dat https://manolinq.com de zelfstandige HTML-versie gebruikt. De zes bestaande routes leveren HTTP 200; de React-routes `/services`, de drie onderliggende serviceroutes en `/about` leverden HTTP 404. De volledige onderbouwing staat in ARCHITECTURE.md.

`npm run build` gebruikt Node zonder frontendframework om de expliciete HTML-pagina's en lokale assets naar `site-dist` te kopiëren. De sitemap houdt dezelfde zes indexeerbare URL's. Elke pagina heeft één H1, een Nederlandse titel en beschrijving, een unieke canonical, Open Graph- en Twitter-metadata. De bestaande organisatiegegevens in structured data zijn behouden; het logo is bijgewerkt. De public-sitemap is gelijkgetrokken met de daadwerkelijk actieve root-sitemap.

Netlify publiceert `site-dist`, gebruikt `netlify/functions` en krijgt expliciete rewrites voor `/work`, `/pricing`, `/process`, `/contact` en `/privacy`. De root blijft `/`. Er is een echte `404.html`; geen SPA-catch-all. De oude `src` en `dist` blijven ongewijzigd aanwezig als historische bestanden en zijn uitgesloten van de nieuwe publieke output. Oude logo-assets en hun eerdere `/public/`-paden blijven beschikbaar voor verwijzingen van buitenaf.

## Behoud van het formulier en de backend

`netlify/functions/submit-lead.js` en de Supabase-migratie zijn byte voor byte ongewijzigd. De back-up is een exacte kopie van het originele ZIP-bestand. SHA-256-controles staan in `review/protected-hashes.json` en worden ook tijdens iedere build gecontroleerd.

Het formulier blijft JSON posten naar `/.netlify/functions/submit-lead`. De twaalf bestaande velden zijn `name`, `business_name`, `email`, `whatsapp_number`, `service_needed`, `budget_range`, `message`, `source`, `page_url`, `user_agent`, `company_website` en `form_started_at`. De service- en budgetwaarden zijn rechtstreeks vergeleken met het originele ZIP en zijn identiek. Alleen zichtbare labels zijn vertaald.

De honeypot, tijdcontrole, oorsprongscontrole, servervalidatie, spamlinkcontrole, Supabase-opslag en Telegram-melding blijven behouden. De browser toont succes alleen bij een geslaagde HTTP-respons met `success: true`. Mislukkingen behouden de invoer; tijdens verzending worden dubbele aanvragen geblokkeerd. Er zijn echte labelkoppelingen, Nederlandstalige veldfouten, focusbeheer en toegankelijke statusmeldingen.

Geen productieomgevingsvariabelen, databasegegevens of tokens zijn gelezen of aangepast. Geen echte testlead is verstuurd.

## Uitgevoerde controles

| Controle | Resultaat |
| --- | --- |
| Installatie via npm ci | Geslaagd; bestaande lockfileversies behouden |
| Productiebuild via npm run build | Geslaagd; zes pagina's, 404, metadata en assets aanwezig |
| Nieuwe productie-JavaScript: lint:site | Geslaagd, geen meldingen |
| Routes en interne links/fragmenten | Alle zes routes, CTA's, navigatie en gebruikte ankers gecontroleerd |
| Responsive browsercontrole | 54 geslaagde controles: alle zes pagina's op 320, 360, 375, 390, 430, 768, 820, 1024 en 1440 px |
| Overloop en afbeeldingen | Geen horizontale documentoverloop; alle gebruikte afbeeldingen laden |
| Mobiele navigatie | Openen, sluiten, Escape, focusherstel en navigeren gecontroleerd |
| Toetsenbord en beweging | Skiplink, focusstijlen, formuliervalidatie en reduced-motion gecontroleerd |
| JavaScript uitgeschakeld | Navigatie blijft beschikbaar; formulierknop geblokkeerd met e-mail/WhatsApp-alternatief |
| Formulier met onderschepte requests | Verplichtvelden, voorselectie, payload, fout, netwerkfout, ongeldige JSON, success:false, loading, dubbele verzending en bevestigde success gecontroleerd |
| Backend in geïsoleerde VM | Supabase en Telegram gemockt; spamcontrole, validatie, opslagfout, melding en Telegramfout gecontroleerd |
| Netlify-functiebundel | Lokaal opgebouwd met Netlify zip-it-and-ship-it/esbuild; CommonJS-handler geëxporteerd, veilige GET geeft 405 en geblokkeerde oorsprong geeft 403 |
| Axe WCAG 2.1 A/AA | 12 scans: zes pagina's op 390 en 1440 px, nul gedetecteerde overtredingen |
| Browserconsole | Geen ongehanteerde JavaScriptfouten; alleen verwachte consolemeldingen bij bewust gesimuleerde HTTP 500/netwerkfout |
| Originele backend en migratie | SHA-256 gelijk aan back-up |
| Bestaande dependencyversies | Geen enkele bestaande versie gewijzigd; alleen ontwikkeltools voor tests toegevoegd |

Bewijsbestanden: `review/test-results.json`, `review/accessibility-results.json`, `review/build-result.json`, `review/bundle-smoke-test.json`, `review/netlify-bundle-result.json`, `review/dependency-preservation.json`. Screenshots van alle pagina's op desktop en mobiel staan in `review/*-desktop.png` en `review/*-mobile.png`.

De visuele controle is uitgevoerd in desktop Chrome met gesimuleerde schermbreedtes, niet op fysieke iPhones of Android-toestellen. Een automatische toegankelijkheidsscan is geen volledige toegankelijkheidscertificering.

## Bestaande technische aandachtspunten

- De oude React-typecheck faalt op hoofdletterverschillen tussen imports en bestandsnamen, bijvoorbeeld `Navbar.tsx` tegenover `navbar.tsx`. Deze problemen waren aanwezig in het aangeleverde archief. De behouden React-code wordt niet gebruikt in de nieuwe build.
- De oude ESLint-controle rapporteert 0 fouten en 1 bestaande `useEffect`-dependencywaarschuwing in `src/hooks/useinview.ts`. De nieuwe productiecode heeft een aparte, schone lintcontrole.
- `npm audit` meldt 23 bestaande dependencybevindingen: 3 laag, 7 middel en 13 hoog. Het volledige rapport staat in `review/dependency-audit.json`. Veel betreffen de oude React/Vite-ontwikkelketen; `ws` in de Supabase-dependencyketen is ook gemeld. Er is bewust geen ongecontroleerde `npm audit fix` uitgevoerd die bestaande backendversies verandert. Plan deze dependency-update afzonderlijk met regressietests.
- De bestaande combinatie van `type: module` in package.json en een CommonJS-backendbestand geeft tijdens esbuild een waarschuwing. De concrete Netlify-output is CommonJS (`outputModuleFormat: cjs`) en de gegenereerde handler is lokaal geladen en gecontroleerd. Er is geen wijziging aan de backendbron gedaan om deze waarschuwing te verbergen.

## Nog te beoordelen door de eigenaar

1. Visueel akkoord op de nieuwe identiteit, teksten en conceptpreviews.
2. De bestaande bron vermeldt niet eenduidig of de prijzen inclusief of exclusief btw zijn. Ook hosting, domein, abonnementen en onderhoud moeten per offerte worden bevestigd. De website verzint hierover geen nieuwe inbegrepen prestaties of betaalvoorwaarden.
3. Controle van de operationele en juridische beweringen in het bestaande privacybeleid: feitelijke Supabase-regio, doorgiften, verwerkersafspraken, bewaartermijnen (waaronder de bestaande zeven jaar voor boekhouding), DPO-plicht en datalekprocedure. Deze punten zijn overgenomen uit het bestaande beleid en niet met accountgegevens of juridisch advies geverifieerd.
4. Toestemming van het betrokken bedrijf vóór eventuele latere publicatie van het echte A&T-project.
5. Beoordeling van de bestaande dependencybevindingen vóór de volgende technische onderhoudsrelease.

## Netlify publiceren — uitsluitend na akkoord

1. Gebruik de bestaande Manolinq-site in Netlify en het bestaande domein `manolinq.com`. Maak geen Vercel-migratie of vervangende accountconfiguratie.
2. Plaats de inhoud van deze projectmap in de bijbehorende repository of stel de Netlify-base directory in op deze map. `package.json` en `netlify.toml` moeten daar samen staan. Neem `review/protected-hashes.json` en de originele ZIP-back-up mee: de build controleert deze bestanden.
3. De meegeleverde configuratie gebruikt buildcommando `npm run build`, publish directory `site-dist` en functions directory `netlify/functions`, met Node 22 en esbuild. Laat de bestaande `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` en eventuele andere omgevingsvariabelen intact.
4. Maak eerst een Netlify Deploy Preview via een reviewbranch, of gebruik vanuit het correct gekoppelde project `netlify deploy --build` zonder `--prod`. Controleer in de deploylog dat `submit-lead` als functie aanwezig is. Publiceer niet alleen de statische output via Netlify Drop; dan wordt de functie niet betrouwbaar meegeleverd.
5. Controleer alle zes routes en de 404 in de preview. Het bestaande backendbeleid kan formulieren vanaf previewdomeinen blokkeren; verander daarvoor niet zomaar productieomgevingsvariabelen. De meegeleverde lokale mocktests vereisen geen echte aanvraag.
6. Publiceer pas na expliciet akkoord via de bestaande Netlify-publicatiewerkwijze. Bewaar de vorige deploy voor rollback. Controleer daarna zonder formulierverzending de routes, assets, canonical URLs en de aanwezigheid van de functie.

Configuratiereferentie: [Netlify Functions-configuratie](https://docs.netlify.com/build/functions/configuration/).

## Niet geverifieerd

De actuele Netlify-accountinstellingen, productiegeheimen, Supabase-schema en RLS in de live account, werkelijke bewaring/verwijdering van gegevens, Telegram-ontvangst en een volledige echte productieverzending zijn niet getest. De lokale mocks en bundelcontrole bewijzen deze externe integraties niet. De live website is niet aangepast.
