export const assistantFeatures={assistantEnabled:true,mobileCtaEnabled:true};

export function assistantData({projects,whatsapp,email,route}){
 const currentProjects=projects.slice(0,3).map(project=>({
  title:project.title,
  category:project.industry,
  url:project.url
 }));
 return {
  ...assistantFeatures,
  route,
  contact:{page:'/contact',email:`mailto:${email}`,whatsapp},
  projects:currentProjects,
  steps:{
   start:{
    title:'Waarmee kan ik je helpen?',
    text:'Kies wat het beste bij je situatie past.',
    options:[
     {label:'Ik wil een website',next:'website'},
     {label:'Mijn website is verouderd',next:'outdated'},
     {label:'Wat kost een website?',next:'pricing'},
     {label:'Ik wil meer aanvragen',next:'leads'},
     {label:'AI-assistent toevoegen',next:'ai'},
     {label:'Bekijk projecten',next:'projects'},
     {label:'Contact opnemen',next:'contact'}
    ]
   },
   website:{title:'Heb je momenteel al een website?',options:[
    {label:'Nee, nog niet',next:'website-new'},
    {label:'Ja, maar ik wil een nieuwe',next:'website-redesign'},
    {label:'Ik twijfel nog',next:'website-unsure'}
   ]},
   'website-new':{title:'Een complete website vanaf nul',text:'Manolinq kan je helpen met een complete website: van structuur en ontwerp tot een verzorgde lancering.',actions:[
    {label:'Bekijk demo-projecten',href:'/work'},
    {label:'Bespreek mijn project',href:'/contact',primary:true}
   ]},
   'website-redesign':{title:'Een gerichte redesign',text:'Dan is een redesign waarschijnlijk de logische volgende stap. We kunnen je huidige website behouden als vertrekpunt en verbeteren waar nodig.',actions:[
    {label:'Bekijk voorbeelden',href:'/work'},
    {label:'Bespreek redesign',href:'/contact',primary:true}
   ]},
   'website-unsure':{title:'We bekijken wat je nodig hebt',text:'Tijdens een kort gesprek brengen we je doelen, inhoud en gewenste functies in kaart. Zo wordt duidelijk of een nieuwe website of gerichte verbetering het beste past.',actions:[
    {label:'Bekijk demo-projecten',href:'/work'},
    {label:'Bespreek mijn project',href:'/contact',primary:true}
   ]},
   outdated:{title:'Verbeteren wat er al is',text:'Een redesign hoeft niet te betekenen dat alles opnieuw moet. We kunnen kijken wat goed werkt en alleen structuur, design, mobiel gebruik en conversie verbeteren.',actions:[
    {label:'Bekijk demo-projecten',href:'/work'},
    {label:'Bespreek redesign',href:'/contact',primary:true}
   ]},
   pricing:{title:'Wat kost een website?',text:'De huidige pakketten starten bij €500 voor Starter, €750 voor Business en €1.250 voor Website + AI. De uiteindelijke prijs hangt af van de inhoud, het aantal pagina’s en extra functionaliteit.',prompt:'Wat wil je ongeveer laten bouwen?',options:[
    {label:'Landing page',next:'price-result'},
    {label:'Bedrijfswebsite',next:'price-result'},
    {label:'Redesign',next:'price-result'},
    {label:'Weet ik nog niet',next:'price-result'}
   ]},
   'price-result':{title:'Ontvang een passend voorstel',text:'We stemmen de inhoud en functies af op je situatie en leggen de concrete scope en prijs vooraf vast.',actions:[
    {label:'Ontvang een voorstel',href:'/contact',primary:true}
   ]},
   leads:{title:'Meer gerichte aanvragen',text:'Dan kijken we niet alleen naar design. Duidelijke CTA’s, mobiel gebruik, offerteflows en een sterke presentatie van je diensten maken vaak het grootste verschil.',actions:[
    {label:'Bekijk hoe Manolinq werkt',href:'/process'},
    {label:'Bespreek mijn website',href:'/contact',primary:true}
   ]},
   ai:{title:'Een assistent voor je bezoekers',text:'Een AI-assistent kan bezoekers helpen met veelgestelde vragen, diensten, kwalificatie van aanvragen en het doorsturen naar de juiste volgende stap.',actions:[
    {label:'Wat kan zo’n assistent doen?',next:'ai-examples'},
    {label:'Bespreek AI-assistent',href:'/contact',primary:true}
   ]},
   'ai-examples':{title:'Praktische mogelijkheden',text:'Afhankelijk van je website en processen kan een AI-assistent onder meer:',bullets:[
    'Veelgestelde vragen beantwoorden',
    'Bezoekers naar de juiste dienst sturen',
    'Leads vooraf kwalificeren',
    'Contact- of offerteflows ondersteunen'
   ],actions:[{label:'Bespreek AI-assistent',href:'/contact',primary:true}]},
   projects:{title:'Demo-projecten van Manolinq',text:'Bekijk maximaal drie actuele websiteconcepten. Dit zijn portfolio-concepten, geen betalende klantprojecten.',projectList:true},
   contact:{title:'Neem contact op',text:'Kies de manier die voor jou het handigst is.',actions:[
    {label:'Project bespreken',href:'/contact',primary:true},
    {label:'E-mail',href:`mailto:${email}`},
    {label:'WhatsApp',href:whatsapp,external:true}
   ]}
  }
 };
}
