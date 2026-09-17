# Later een echt project toevoegen

De twee huidige items in de `projects`-lijst in `scripts/render-pages.mjs` hebben expliciet `type: 'concept'`. Hun illustraties, teksten en labels blijven ontwerpstudies. Er is geen opdrachtgever aan gekoppeld.

Voor een echt project accepteert dezelfde kaart deze velden:

```js
{
  type: 'client',
  publicationApproved: true, // Alleen invullen na aantoonbare toestemming.
  id: 'een-goedgekeurd-project',
  industry: 'Werkelijke sector',
  category: 'Bedrijfswebsite',
  title: 'Goedgekeurde projecttitel',
  description: 'Feitelijke beschrijving van de uitvoering.',
  detail: 'Optionele, goedgekeurde toelichting.',
  image: {
    src: '/images/werkelijke-projectpreview.webp',
    alt: 'Beschrijving van de echte websitepreview',
    width: 1200,
    height: 800
  },
  url: 'https://het-goedgekeurde-project.example' // Optioneel; gebruik een echte bestemming.
}
```

Dit voorbeeld is uitsluitend documentatie en wordt niet gepubliceerd. Een klantitem zonder `publicationApproved: true` wordt niet gerenderd. Een goedgekeurd klantitem zonder echte afbeelding en afmetingen stopt de render met een fout. Het gebruikt nooit de conceptillustraties. Zonder project-URL verwijst de kaart naar een projectbespreking; er verschijnt geen dode link.

Pas ook de introductie en concepttoelichting aan wanneer de pagina daadwerkelijk zowel klantprojecten als concepten toont. Voeg geen claims, resultaten of testimonials toe zonder onderbouwing. Geen A&T-naam, beeldmateriaal of demo-URL publiceren zonder toestemming.

Voer na een wijziging `npm run render`, `npm run build`, `npm run lint:site` en `npm test` uit.
