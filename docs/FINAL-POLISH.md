# Manolinq 2.0 — final polish

17 september 2026. Lokale reviewversie; niet gepubliceerd.

## Gerichte wijzigingen

- Het geometrische M-symbool heeft scherpere, samenhangende contouren. Het woordmerk is nu een vectorcontour van Manrope 650, zonder afhankelijkheid van Arial of een geïnstalleerd lettertype. Primair, licht, donker, icoon, favicon en sociale preview gebruiken dezelfde identiteit. De horizontale SVG-afmetingen blijven 224 × 40. Bron, OFL-licentie en reproductie staan in `review/brand-source`; generator: `scripts/refine-brand.py`.
- De mobiele hero is circa 27–33% korter op de vier gevraagde breedtes. De headline is behouden. Beide echte CTA's hebben een 52 px hoog klikvlak; de tweede heeft een duidelijk vlak en rand. De decoratieve preview is compacter, zonder kleine navigatie of overbodige bijschriften op mobiel.
- Beide bestaande projecten zijn zichtbaar als ontwerpconcept gemarkeerd. De previews hebben een duidelijke status, categorie en inhoudshiërarchie. De gedeelde component ondersteunt later echte projecten met expliciete publicatietoestemming en echte afbeeldingen; zie `PORTFOLIO.md`. Er zijn geen klantnamen, testimonials, resultaten of statistieken toegevoegd.
- Mobiele labels, knoppen, pakketdetails, formuliertekst en footer zijn gericht verbeterd. Formuliervelden gebruiken 16 px. De privacytabel houdt horizontaal scrollen binnen het eigen vlak.

## Verificatie

`npm run render`, `npm run build`, `npm run lint:site` en `npm test` slagen. De bestaande suite controleert zes routes op negen breedtes (54 combinaties), navigatie, interne links, afbeeldingen, metadata, vijf formuliergevallen en vier geïsoleerde backendgevallen. Geen ongehanteerde browserfouten. De twaalf Axe-scans op 390 en 1440 px hebben nul gedetecteerde overtredingen en nul onbesliste resultaten.

`node tests/polish-review.mjs` controleert daarnaast alle zes pagina's op 320, 360, 390 en 430 px: 24 combinaties, geen horizontale pagina-overloop, behouden prijzen, conceptlabels en voldoende grote hero-knoppen. Screenshots staan in `review/polish-*.png`; meetwaarden in `review/polish-review.json`. `scripts/capture-polish-details.mjs` maakt aanvullende contact sheets en detailbeelden met een lokaal beschikbare Sharp-installatie (`SHARP_PATH`).

De eerder onbesliste privacycontrastcontrole betrof tabelcellen die gedeeltelijk buiten het horizontale scrollvlak lagen. De tabel is handmatig aan beide scrolluiteinden bekeken; tekst en achtergrond blijven duidelijk onderscheidbaar. Berekend contrast van de gecontroleerde privacytekst is minimaal **8,87:1**, boven 4,5:1 voor gewone tekst. De cellen hebben nu een expliciete donkere achtergrond. Dit is geen volledige toegankelijkheidscertificering. Bewijs: `review/pre-polish/privacy-contrast-details.json`, `review/polish-review.json` en de vier `polish-privacy-table-*` afbeeldingen.

Templates in `scripts/render-pages.mjs`, gegenereerde HTML en `site-dist` zijn gesynchroniseerd. De standalone HTML/Netlify-architectuur, Function, Supabase- en Telegram-integratie, databaseschema en productieomgevingsvariabelen zijn niet gewijzigd. Beschermde bronhashes worden door build en tests gecontroleerd. Formuliertests gebruiken uitsluitend mocks; er zijn geen echte leads verstuurd.

De historische React-bronnen vallen buiten deze polish. Hun eerder vastgestelde typecheckproblemen en dependency-auditbevindingen blijven gedocumenteerd in `DELIVERY.md`; ze zijn niet als opgelost aangemerkt.

## Goedkeuring door eigenaar

- Definitieve goedkeuring van het verfijnde logo.
- Btw-behandeling, eventuele hostingkosten, onderhoudsafspraken en betalingsvoorwaarden zijn nog niet bevestigd. Deze zijn niet ingevuld of verzonnen.
- De bestaande vanafprijzen blijven €500, €750 en €1.250; bestaande pakketprestaties zijn behouden.
- Voor toekomstige echte klantprojecten zijn toestemming en echte projectgegevens nodig.

De ZIP bevat de volledige bron en de gecontroleerde productie-uitvoer in `site-dist`. Voor een handmatige statische upload gebruik je die uitvoer; voor het werkende Netlify-formulier blijft ook de bestaande Functions-configuratie nodig. Een losse statische upload naar een andere host installeert de Netlify Function niet automatisch.
