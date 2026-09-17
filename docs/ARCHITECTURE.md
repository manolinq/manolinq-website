# Productie-inspectie — 17 september 2026

Vastgelegd vóór wijzigingen aan de website.

## Bewijs uit het aangeleverde archief en de live site

- Root `index.html` is een zelfstandige HTML-pagina, met inline CSS, JavaScript en een JPEG-portret in base64. Er is geen React-entrypoint in die pagina.
- `work.html`, `pricing.html`, `process.html`, `contact.html` en `privacy.html` zijn eveneens zelfstandige pagina's. De root-sitemap noemt precies deze zes routes.
- Alleen `src/main.tsx` start React. `src/app.tsx` bevat afwijkende routes, waaronder `/services` en `/about`, plus een catch-all naar de homepage.
- `package.json` voert oorspronkelijk `vite build` uit. `vite.config.ts` specificeert geen multi-page inputs. De meegeleverde `dist/index.html` is een oudere React-build en komt niet overeen met de root-homepage. De hoofdlettergevoelige assetnamen in die HTML komen bovendien niet overeen met de ZIP-bestandsnamen.
- `public/_redirects` en `dist/_redirects` bevatten een SPA-catch-all. De sitemap in public/dist wijkt af van de root-sitemap.
- Het archief bevat geen `netlify.toml`; de daadwerkelijk ingestelde Netlify-build- en publishinstellingen zijn niet beschikbaar.
- Read-only HTTP-controle van https://manolinq.com op 17 september 2026: `/`, `/work`, `/pricing`, `/process`, `/contact` en `/privacy` retourneren HTTP 200 met de standalone HTML-titels. De homepage bevat het base64-portret en geen React-root. Serverheader: Netlify.
- `/services`, `/services/websites`, `/services/landing-pages`, `/services/ai-systems` en `/about` retourneren HTTP 404. Dit zijn geen werkende productieroutes.

## Besluit

De standalone HTML-website is de geverifieerde productiebron. De redesign wijzigt deze zes bestaande HTML-pagina's en deelt styling en kleine scripts via lokale bestanden. Geen framework- of hostingmigratie.

Een expliciete Node-build kopieert uitsluitend de bedoelde publieke bestanden naar `site-dist`. Netlify gebruikt deze map, niet de verouderde `dist`. Bekende schone URL's krijgen expliciete rewrites; onbekende paden krijgen 404. De ongebruikte React-broncode en originele dist blijven behouden als historische bestanden, maar komen niet in de nieuwe productie-output.

## Back-up en beschermde onderdelen

`review/Manolinq-original-2026-09-16.zip` is een ongewijzigde kopie van het aangeleverde archief. Het originele ZIP-bestand op het bureaublad blijft intact. SHA-256-controles worden vastgelegd voor backend, migratie en back-up.

`netlify/functions/submit-lead.js`, de Supabase-migratie, databasecontracten en omgevingsvariabelen worden niet gewijzigd. De frontend blijft JSON posten naar `/.netlify/functions/submit-lead` met dezelfde twaalf payloadvelden en bestaande service- en budgetwaarden. Tests onderscheppen verzoeken lokaal; geen echte leads.

De read-only live inspectie bewijst de gebruikte pagina's, niet de werking van Supabase, Telegram of de daadwerkelijke Netlify-accountinstellingen.
