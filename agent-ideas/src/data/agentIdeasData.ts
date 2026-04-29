// Normalized agent idea data derived from the Engage Agent Use Cases CSV.
// Original Swedish columns: ID, Namn (submitter), Titel (title), Beskrivning (description),
// Användarroll (user roles), Utmaning (challenge), Affärsnytta (business value), Kommentarer (comments).
// Category is derived from each idea's domain context.

import type { AgentIdea } from '../types/agentIdeas';

export const AGENT_IDEAS: AgentIdea[] = [
  {
    id: 1,
    title: 'Serviceorderagent',
    submitter: 'Erik Toresson',
    description:
      'Förebyggande serviceagent som analyserar arbetsordrar, teknikeranteckningar, inspektioner m.m. av assets för att identifiera mönster som tyder på framtida fel (innan de uppstår).',
    userRoles: ['Servicechef', 'Dispatcher', 'Service Manager'],
    challenge:
      'All information finns men är utspridd i ostrukturerad data (som ex. anteckningar), leder till reaktiva åtgärder.',
    businessValue: 'Proaktivt underhåll. Sänker kostnader och ökar kundnöjdhet.',
    comments:
      'Funderar på hur vi inom AM kan göra förvaltningen mer proaktiv, datadriven och rådgivande, istället för reaktiv support. Koppling till AM Roadmap assessment.',
    category: 'Service Management',
  },
  {
    id: 2,
    title: 'Förvaltningsagent',
    submitter: 'Helene Sahlsten',
    description:
      "Agent som sammanfattar driftläge, incidenthistorik, förbättringsförslag och föreslår 'roadmap'-punkter inför mer taktiska/strategiska möten med kunden.",
    userRoles: ['Service Delivery Manager', 'SDM', 'TSA'],
    challenge:
      "Möten inom AM blir väldigt statusfokuserade och reaktiva — envägskommunikation. Att manuellt ta fram underlag för kopplingen mellan drift och affärsvärde är tidskrävande.",
    businessValue:
      'Mer strategiska dialoger där vi jobbar tillsammans. Tydlig koppling mellan AM och affärsnytta stärker oss som AM-partner långsiktigt.',
    category: 'Application Management',
  },
  {
    id: 3,
    title: 'Orderstatusagent',
    submitter: 'Carola Sääski',
    description:
      'En agent som snabbt visar status för slutkundens orderrader utifrån statusen på relaterade intercompanyordrar.',
    userRoles: ['Säljare', 'Sales Manager', 'Sales Representative'],
    challenge:
      'Det är många steg för att komma fram till vilken status en orderrad är i det relaterade bolaget. Kopplade till produktioner, material som saknas och inväntar inleverans.',
    businessValue:
      'Enkelhet att ge svar åt kunder både internt och externt, lättare att hitta avvikelser som behöver åtgärd.',
    category: 'Sales',
  },
  {
    id: 4,
    title: 'Säljprognosagent',
    submitter: 'Fredrik Wahlgren',
    description:
      'Säljprognos per produkt utifrån tidigare års statistik extrapolerat, med hänsyn taget till storhelger, kampanjer etc. Möjlighet att låsa delar av prognosen och köra om. Input till inköp.',
    userRoles: ['Planner', 'Kategoriansvarig', 'Planering', 'Inköp'],
    challenge:
      'Kan delvis utföras med Demand Planner-verktyget redan, men är fortfarande en ganska manuell historia.',
    businessValue: 'Högre servicegrad och lägre lagerbindning.',
    category: 'SCM & Planning',
  },
  {
    id: 5,
    title: 'Bankagent',
    submitter: 'Fredrik Wahlgren',
    description: 'Automatisk matchning av rader i bankavstämningsfil.',
    userRoles: ['Finans', 'Finance Manager', 'Controller'],
    challenge: 'Delvis manuell hantering idag.',
    businessValue: 'Snabbare hantering i det dagliga arbetet.',
    category: 'Finance',
  },
  {
    id: 6,
    title: 'Integrationsagent',
    submitter: 'Fredrik Wahlgren',
    description: 'AI-förslag på mappning i integrationer mellan käll- och målsystem (AS-IS).',
    userRoles: ['Utvecklare'],
    challenge: 'Delvis manuell hantering idag.',
    businessValue: 'Kortare ledtid att sätta upp nya integrationer.',
    category: 'Development & Tech',
  },
  {
    id: 7,
    title: 'Användaradministrationsagent',
    submitter: 'Frida Milne',
    description:
      'Skapar nya användare i D365FO & Entra & tilldelar rätt licens i M365 Admin panel. Kan även checka mellan PPAC och D365FO license usage summary report och meddela diskrepanser/användare utan rätt licens.',
    userRoles: ['Systemadministratör'],
    challenge:
      'Tidskrävande och ingen uppdatering när MS gör ändringar i license requirement för entry points — vissa roller kräver plötsligt en annan licens.',
    businessValue:
      'Bättre koll på licenshanteringen mellan D365FO och Entra. Kan automatiskt disable:a användare i D365FO när folk slutar.',
    comments:
      'Vore smidigt att ha en koll mellan aktiva användare i D365FO och Entra; folk som slutat kan finnas kvar som aktiva användare.',
    category: 'System Administration',
  },
  {
    id: 8,
    title: 'Kundsupportagent',
    submitter: 'Daniel Hallén',
    description:
      'Kundsupport-agent för effektiv hantering av lagerställen på försäljningsorder.',
    userRoles: ['Kundtjänst'],
    challenge:
      'Kunder vill ibland ha samlad leverans och ibland snabb leverans. Mycket manuellt arbete att kolla upp var saldo finns och vilka kvantiteter som är tillgängliga.',
    businessValue:
      'Agentstyrning för att få rätt lagerställen utifrån förutsättningar för den aktuella kundens behov.',
    category: 'Warehouse & Logistics',
  },
  {
    id: 9,
    title: 'Leverantörsbevakningagent',
    submitter: 'Daniel Hallén',
    description:
      'Effektiv leverantörsbevakning. Tolkar ordererkännanden från leverantörer och uppdaterar inköpsorderrader automatiskt.',
    userRoles: ['Inköp', 'Inköpsadministratör', 'Purchasing Manager'],
    challenge:
      'Hantering av ordererkännanden kräver ofta att en PDF öppnas och aktuella inköpsorderrader uppdateras. Kan även påverka försäljningsorders, transferorders eller produktionsorders.',
    businessValue:
      'Tolka PDF:er och automatiskt uppdatera inköpsorders. Identifiera påverkade orders som behöver justeras utifrån det nya inleveransdatumet.',
    category: 'SCM & Planning',
  },
  {
    id: 10,
    title: 'Projektagent 1',
    submitter: 'Mattias Rosendahl',
    description:
      'Project CoE-agent för projektmetodik och leveransstöd. Stödjer projektledaren längs hela projektlivscykeln — agendor för Sprint Planning, CRP och Retrospective, svar på metodikfrågor och hämtning av material från SharePoint/Teams.',
    userRoles: ['Projektledare', 'Projektadministratör', 'Lösningsarkitekt'],
    challenge:
      'Kunskap och dokumentation finns men är utspridd. Tidskrävande att hitta rätt material — hjulet uppfinns på nytt, agendor skrivs från scratch, lärdomar glöms bort.',
    businessValue:
      'Sparar tid genom att direkt leverera agendor, mallar och dokumentation. Teamet arbetar mer enhetligt med beprövad metodik.',
    category: 'Project Management',
  },
  {
    id: 11,
    title: 'Config Compare Agent',
    submitter: 'Hampus Tengwall',
    description:
      'Effektiviserar jämförande och flytt av konfiguration mellan miljöer och bolag. Säkerställer global konfig kontra golden config innan kopiering.',
    userRoles: ['Migration Lead'],
    challenge: 'Tidskrävande och enformig uppgift.',
    businessValue: 'Mer tid till kvalitetssäkring och validering av data.',
    category: 'Development & Tech',
  },
  {
    id: 12,
    title: 'Skapa Bolag Agent',
    submitter: 'Hampus Tengwall',
    description: 'Skapar nytt bolag utifrån ett antal parametrar automatiskt.',
    userRoles: ['Migration Lead'],
    challenge:
      'Idag är det en manuell process att skapa ett nytt bolag och kopiera basparametrar och referensdata i golden config.',
    businessValue:
      'Processen kan effektiviseras, snabbas upp och bli mer korrekt via migreringsagent.',
    category: 'System Administration',
  },
  {
    id: 13,
    title: 'Offertagent',
    submitter: 'Hampus Tengwall',
    description: 'Effektiviserar offertprocess och kortar ned tid från förfrågan till offert.',
    userRoles: ['Säljare', 'Projektledare', 'Produktingenjör'],
    challenge:
      'Avancerad offereringsprocess med flertalet datakällor — dagspris på råvaror, timpriser för ingenjörer, ledtidsberäkningar och materialåtgång.',
    businessValue:
      'Data kan hämtas in och sammanställas snabbare för att underlätta planering.',
    category: 'Sales',
  },
  {
    id: 14,
    title: 'Utbildningsagent',
    submitter: 'Rickard Hilding-Lehtonen',
    description:
      'Utbildningsupport för dagligt arbete. Hjälper användare att förstå hur man utför processer man sällan använder.',
    userRoles: ['Slutanvändare'],
    challenge:
      'Veta hur man ska göra vilka processer när man antingen är ny eller processer man sällan utför.',
    businessValue:
      'Användare som jobbar enligt uppsatta processer och enklare onboarding för nya anställda. Kan användas för utbildning av slutanvändare i projektform.',
    category: 'HR & Training',
  },
  {
    id: 15,
    title: 'Avstämningsagent 1',
    submitter: 'Fredrik Strömberg',
    description:
      'Agent för löpande körning av reconciliation mellan General Ledger och Subledger.',
    userRoles: ['Finance Controller'],
    challenge:
      'Reconciliation körs vanligen endast vid månadsbokslut — då är det bråttom att få allt i ordning och rätta fel.',
    businessValue:
      'Mycket stor nytta för en alltid pressad Finance-avdelning. Potentiella fel är redan framme och i bästa fall rättade vid månadsbokslutet.',
    category: 'Finance',
  },
  {
    id: 16,
    title: 'Avstämningsagent 2',
    submitter: 'Fredrik Strömberg',
    description:
      'Direkt kopplad till Avstämningsagent 1. En agent som "förbereder" inför reconciliation, flaggar upp betalningsjournaler m.m. som måste bokas.',
    userRoles: ['Finance Controller'],
    challenge: 'Kräver att leverantörsfakturor som ligger för slutattest verkligen attesteras.',
    businessValue:
      'Vi jobbar Proaktivt istället för Reaktivt. Agenter hade blivit Hjältar om vi kunde vända detta!',
    category: 'Finance',
  },
  {
    id: 17,
    title: 'Kopiera Miljöagent',
    submitter: 'Ann-Charlotte Gillberg',
    description:
      'Agent för kopiering av produktionsmiljö till testmiljö med hantering av roller, konfig, master data och anpassningar som behöver återställas.',
    userRoles: ['Systemadministratör'],
    challenge: 'Ofta tidskrävande och risk för fel.',
    businessValue:
      'Snabbare uppstart av produktionslik testmiljö för säkrare verifiering av lösning.',
    category: 'System Administration',
  },
  {
    id: 18,
    title: 'Processkartläggningsagent',
    submitter: 'Ann-Charlotte Gillberg',
    description:
      'Processmappning/karta som output baserat på instruktioner eller steg i applikationen.',
    userRoles: ['Applikationskonsult'],
    challenge: 'Få en lagom detaljerad nivå på processkarta.',
    businessValue:
      'Visualiserad bild av en process, som underlag till att hitta eventuella GAPs.',
    category: 'Development & Tech',
  },
  {
    id: 19,
    title: 'MRP Agent',
    submitter: 'Christer Fjällner',
    description:
      'Svarar på frågor om planering (MRP). Exempel: Varför är försäljningsordern försenad? Varför kan inte produktionsordern starta? Varför föreslår MRP denna "Action"?',
    userRoles: ['Planerare', 'Säljare'],
    challenge: 'Informationen finns i D365, men det är tidskrävande att tolka och ta rätt åtgärd.',
    businessValue: 'Spara arbetstid och öka kvalitén på beslut.',
    category: 'SCM & Planning',
  },
  {
    id: 20,
    title: 'Pegging/Marking Agent',
    submitter: 'Christer Fjällner',
    description: 'Skapar grafisk presentation av Pegging/Marking i D365.',
    userRoles: ['Planerare'],
    challenge: 'Informationen finns i D365, men det är svårt att få en bra överblick.',
    businessValue: 'Spara arbetstid och öka kvalitén på beslut.',
    category: 'SCM & Planning',
  },
  {
    id: 21,
    title: 'Projektagent 2',
    submitter: 'Jimmy Vall',
    description:
      'Agent för modernisering av processer inom produktion, lager, logistik, försäljning och data i samband med AX2012 → D365-migration. Automatiserar matchning, klassificering och analys.',
    userRoles: ['Processägare', 'SME', 'Produktionsplanerare', 'Lagerpersonal', 'BI-analytiker', 'Projektledning'],
    challenge:
      'Många manuella steg i produktion, lager och transport. Komplex matchning av produktionsdata. Variantbyten, kvalitetsklassificering och avvikelser kräver manuell hantering. Tunga Excel-simuleringar.',
    businessValue:
      'Automatisera matchning och klassificering. Optimera lagerflöden och upptäcka avvikelser i realtid. Förutse flaskhalsar i transport- och terminalflöden.',
    category: 'Project Management',
  },
  {
    id: 22,
    title: 'Felsökningsagent',
    submitter: 'Martin Hägg',
    description:
      'Felsökning inom D365 för AM/Governance. Hjälper användare att förstå tekniska eller otydliga felmeddelanden.',
    userRoles: ['AM', 'Governance Team', 'First-/Secondline support'],
    challenge:
      'Tekniska felmeddelanden i FO kan vara svåra att felsöka och skickas ofta ner till Second/Third line som blir en bottleneck.',
    businessValue:
      'Experter avlastas och snabbare turnaround på problem, mer självhjälp från super/endusers.',
    category: 'Application Management',
  },
  {
    id: 23,
    title: 'Testdataagent',
    submitter: 'Martin Hägg',
    description:
      'Underhåller testdata i miljöer. Kopierar data och konfig från golden/PROD, säkrar kvalitet i data och säkrar att alla miljöer har bästa möjliga förutsättningar för test.',
    userRoles: ['AM', 'Governance Team'],
    challenge:
      'Med växande databaser, mer komplexa lösningar och dyrare lagring behöver vi minimera storleken på test- och utvecklingsmiljöer.',
    businessValue: 'Bättre kvalitet på analys/design/test med låg underhållskostnad.',
    category: 'Application Management',
  },
  {
    id: 24,
    title: 'Config Compare Agent 2',
    submitter: 'Martin Hägg',
    description:
      'Jämför konfiguration mellan miljöer. Kan även automatisera dokumentation av konfiguration.',
    userRoles: ['AM', 'Governance', 'Projekt team'],
    challenge:
      'Med många miljöer och en golden config som ibland inte hålls uppdaterad från PROD kan det bli svårt att hålla koll.',
    businessValue:
      'Kvalitetssäkra konfig mellan miljöer inom implementation och AM. Minimera nedlagd tid för att hålla miljöer i synk.',
    category: 'Development & Tech',
  },
  {
    id: 25,
    title: 'Errorlogagent',
    submitter: 'Helena Ahlbäck',
    description:
      'Sammanställer errorloggar från batchjobb och mejlar Sales takers. Strukturerar loggar från WMS Release to warehouse-jobb till en användbar lista med Kundorder–problemtyp–Sales taker.',
    userRoles: ['Säljare', 'Bolagsintern SME', 'Lageransvariga'],
    challenge:
      'WMSens Release to warehouse-jobb är känsliga för fel. Felloggarna i standard är bara en massa rader i sekvens som kräver omfattande manuell tvättning i Excel.',
    businessValue:
      'Kunder får leveranser i tid. Tillit till systemet. Avlastning för lageransvariga och SMEer.',
    category: 'Warehouse & Logistics',
  },
  {
    id: 26,
    title: 'Shipmentagent',
    submitter: 'Helena Ahlbäck',
    description:
      'Signal till lagret när kundorder har fått flera shipments på samma dag. Hjälper lagerpersonal att konsolidera shipments på rätt sätt.',
    userRoles: ['Lagerarbetare'],
    challenge:
      'Vid låga lagernivåer och delleveranser skapas flera shipments per order på samma dag. Lagerarbetaren märker inte detta och packar/levererar separat — multipla fraktbokningar men kunden betalar bara en gång.',
    businessValue:
      'Sparar pengar från multipla frakter. Befriar lagerpersonalen från manuella kontroller. Kunden får en enda sampackad leverans per dag.',
    category: 'Warehouse & Logistics',
  },
  {
    id: 27,
    title: 'Prestandafelsökningsagent',
    submitter: 'Oskar Zacharoff',
    description: 'Agent för felsökning och prestanda-analys i Trace Parser.',
    userRoles: ['Utvecklare', 'Teknisk Arkitekt'],
    challenge: 'Det tar tid att hitta fel/prestandautmaningar i call stacken.',
    businessValue:
      'Agenten skulle snabbt kunna peka oss i rätt riktning utifrån en beskrivning av problemet man försöker lösa.',
    category: 'Development & Tech',
  },
  {
    id: 28,
    title: 'Kundsupportagent 2',
    submitter: 'Andreas Petersson',
    description: 'Kundsupport-agent som kategoriserar supportärenden automatiskt.',
    userRoles: ['Kundtjänst'],
    challenge:
      'Stor mängd supportcase varje dag — kundtjänst orkar/bryr sig inte att kategorisera.',
    businessValue:
      'Rätt person kan bli tilldelad case, plus att man får ordentlig statistik att utgå från.',
    category: 'Customer Support',
  },
  {
    id: 29,
    title: 'Knowledge Article Agent',
    submitter: 'Andreas Petersson',
    description: 'Föreslår svar till kund med utgångspunkt från Knowledge Articles.',
    userRoles: ['Kundtjänst'],
    challenge: 'Enklare frågor tar upp en stor del av arbetsdagen.',
    businessValue:
      'Kan man ha svaret färdigt och bara skicka send efter en snabb check hade det frigjort tid att tackla svårare ärenden.',
    category: 'Customer Support',
  },
  {
    id: 30,
    title: 'Farligt Godsagent',
    submitter: 'Andreas Petersson',
    description:
      'Tolkar vitt skilda utseenden på farligt gods-dokument (PDF, Word, Excel, mobilbild, handskrivet) och extraherar relevant data.',
    userRoles: ['Kundtjänst'],
    challenge:
      'Enorma mängder farligt gods-dokument med alla möjliga format och utseenden — ingen standard. Allt behöver synas med ögon och skrivas av in i affärssystemet.',
    businessValue:
      'Spara enorm tid i att tolka och få in datan så att man kan klippa och klistra in i affärssystemet.',
    category: 'Customer Support',
  },
  {
    id: 31,
    title: 'Skapa Produkt Agent',
    submitter: 'Lars-Peter Westman',
    description:
      'Använd en agent för att skapa upp produkter istället för att göra det manuellt och hoppa mellan flera sidor i D365.',
    userRoles: ['Product Manager'],
    challenge:
      'Att skapa en slutartikel manuellt kan ta 20–30 minuter — man måste hoppa mellan flera sidor i D365 med grunddata, plus skapa costprice, BOM, route m.m.',
    businessValue: 'Minimerar tid för att skapa en artikel.',
    category: 'SCM & Planning',
  },
  {
    id: 32,
    title: 'Kassa Konfigurator Agent',
    submitter: 'John Hermander',
    description:
      'Skapar upp butiker och tillhörande kassor utefter mallar och input grunddata (butiksnamn/nummer, adresser, butiksstorlek, antal kassor CPOS/MPOS/HW stations etc.).',
    userRoles: ['Systemadministratör'],
    challenge: 'Tidsåtgång samt risk för misstag vid manuell uppsättning.',
    businessValue: 'Säkerställer rätt butiksuppsättning och tidsbesparing vid nyetablering.',
    category: 'Retail',
  },
  {
    id: 33,
    title: 'Retail Transaction Agent',
    submitter: 'John Hermander',
    description:
      'Analyserar retail-transaktioner för att hitta potentiella misstag runt dagsavslut eller kassörer som möjligen fuskar (returer/rabatter eller lagerjusteringar gjorda på samma produkter efter returer).',
    userRoles: ['Controlling', 'Butikschefer'],
    challenge:
      'Inget OOB-verktyg för att analysera misstänkt beteende från kassörer eller hjälpa felsöka differenser vid dagsavslut.',
    businessValue: 'Utbilda personal, hitta bedrägerier samt förkorta felsökning vid dagsavslutsdifferenser.',
    category: 'Retail',
  },
  {
    id: 34,
    title: 'Lagertransaktionsagent',
    submitter: 'John Hermander',
    description:
      'Analyserar specifika artiklar och dess transaktioner för ett warehouse för att förstå varför man har stor differens sedan senaste inventeringstillfället.',
    userRoles: ['Controlling', 'Butikschefer', 'Inventeringsansvarig'],
    challenge:
      'Problem att få en bra översikt eller kolla manuellt på artiklar med många transaktioner.',
    businessValue:
      'Rätta till eller få bättre förklaringar till stora inventeringsdifferenser.',
    category: 'Retail',
  },
  {
    id: 35,
    title: 'Testagent',
    submitter: 'SCM / Retail Forum',
    description:
      'Skapar testfall i Azure DevOps samt genomför regressionstester i samband med versionsuppdateringar och nya releaser till Produktion.',
    userRoles: ['Testare', 'Testlead'],
    challenge: 'Tidskrävande och manuella processer.',
    businessValue: 'Automatisera och effektivisera arbetet kopplat till test.',
    category: 'Development & Tech',
  },
  {
    id: 36,
    title: 'Datamappningsagent',
    submitter: 'SCM / Retail Forum',
    description: 'Föreslår mappningar mellan legacy ERP och Dynamics 365 F&O.',
    userRoles: ['Datamigrerings Lead'],
    challenge: 'Tidskrävande och manuella processer.',
    businessValue: 'Automatisera och effektivisera arbetet kopplat till datamigrering.',
    category: 'Development & Tech',
  },
  {
    id: 37,
    title: 'Säkerhetslageragent',
    submitter: 'SCM / Retail Forum',
    description:
      'Justerar kontinuerligt säkerhetslager efter säsong, kampanjer osv.',
    userRoles: ['Planerare'],
    challenge:
      'Inkorrekta lagernivåer, onödigt mycket kapital uppbundet i lager, bristfälliga servicenivåer.',
    businessValue: 'Ökad servicenivå, mindre kapital uppbundet i lager.',
    category: 'SCM & Planning',
  },
  {
    id: 38,
    title: 'Nummerserieagent',
    submitter: 'Finansforum',
    description:
      'Skapar nummerserier på ett wizard-mässigt sätt men med bättre utfall än standardwizard.',
    userRoles: ['Systemadministratör', 'Applikationskonsult'],
    challenge: 'Tidskrävande process, risk för avvikelse mot best-practices.',
    businessValue: 'Enklare att återanvända en MS och Engage best-practice-mall.',
    category: 'Finance',
  },
  {
    id: 39,
    title: '"Att göra"-Finansagent',
    submitter: 'Finansforum',
    description:
      'En daglig kontroll av att alla delar av bokföringen sker som planerat — kundinbetalningar, leverantörsbetalningar och leverantörsfakturaregistreringar.',
    userRoles: ['Finance Controller', 'Kundreskontra', 'Levreskontra'],
    challenge:
      'Brist på interaktiva förslag på dagliga aktiviteter skapar risk för att man lägger tid på fel saker eller att viktiga arbetsuppgifter glöms bort.',
    businessValue: 'Operational excellence.',
    category: 'Finance',
  },
  {
    id: 40,
    title: 'Ledger Settlement Agent',
    submitter: 'Finansforum',
    description: 'Ger smarta förslag på vad som kan settlas mot huvudboken.',
    userRoles: ['Finance Controller'],
    challenge: 'Tidskrävande, manuell process med risk för fel.',
    businessValue: 'Operational excellence.',
    category: 'Finance',
  },
  {
    id: 41,
    title: 'Kundinbetalningsagent',
    submitter: 'Finansforum',
    description:
      'Inläsning av kundinbetalningsfil där allt sker automatiskt och enbart undantag kvarstår att hantera.',
    userRoles: ['Finance Controller', 'Kundreskontra'],
    challenge: 'Tidskrävande, manuell process med risk för fel.',
    businessValue: 'Operational excellence.',
    category: 'Finance',
  },
  {
    id: 42,
    title: 'Electronic Reporter Agent',
    submitter: 'Finansforum',
    description:
      'Hjälper till att konfigurera och felsöka Electronic Reporter. Agenten kan automatiskt ändra värden/formler i ER config utifrån text input, lägga till fält i datamodell och mappa mot systemfält.',
    userRoles: ['Applikationskonsult'],
    challenge: 'Manuell process som kräver en hel del tekniska färdigheter.',
    businessValue: 'Ökar användarvänligheten och snabbheten att skapa nya ER-rapporter.',
    category: 'Finance',
  },
  {
    id: 43,
    title: 'Konfig Agent',
    submitter: 'Finansforum',
    description:
      'Hjälper med att identifiera konfiguration som saknas kopplad till olika moduler och förmågor.',
    userRoles: ['Applikationskonsult'],
    challenge: 'Manuell och tidskrävande process. Risk att man missar viktig uppsättning.',
    businessValue: 'Operational excellence.',
    category: 'System Administration',
  },
  {
    id: 44,
    title: 'Stänga Perioder Agent',
    submitter: 'Finansforum',
    description:
      'Automatiserar stängningen av moduler i periodbokslut över flera legala enheter, enligt fastställt schema.',
    userRoles: ['Finance Controller'],
    challenge: 'Manuell och tidskrävande process. Risk att man missar viktig uppsättning.',
    businessValue: 'Operational excellence.',
    category: 'Finance',
  },
  {
    id: 45,
    title: 'Financial Reporter Agent',
    submitter: 'Finansforum',
    description: 'Hjälper till att skapa kundanpassade Financial Reports.',
    userRoles: ['Finance Controller'],
    challenge: 'Manuell och tidskrävande process.',
    businessValue: 'Operational excellence.',
    category: 'Finance',
  },
  {
    id: 46,
    title: 'Skapa Kontostruktur Agent',
    submitter: 'Finansforum',
    description:
      'Skapar kontostruktur i D365 Finance. Man kan prata med en agent kring utformning av kontostruktur.',
    userRoles: ['Finance Controller'],
    challenge: 'Undvik manuell och tidskrävande uppsättning.',
    businessValue:
      'Användarvänlig process där man kan prata med en agent kring utformning av kontostruktur.',
    category: 'Finance',
  },
  {
    id: 47,
    title: 'Bank Reconciliation Agent',
    submitter: 'Finansforum',
    description:
      'Laddar upp och hämtar banktransaktioner och bokför leverantörsbetalningar, betalningsjournaler och kundbetalningsjournaler samt föreslår andra transaktioner.',
    userRoles: ['Finance Controller'],
    challenge: 'Manuell process.',
    businessValue: 'Automatiserar och effektiviserar bankavstämningsprocessen.',
    category: 'Finance',
  },
  {
    id: 48,
    title: 'Licensoptimeringsagent',
    submitter: 'Oscar Zeidler',
    description:
      'Agent som optimerar licenser ner på Duty/Privileges-nivå för nya säkerhetsroller.',
    userRoles: ['Systemadministratör'],
    challenge:
      'Kund betalar mer för D365-licenser än nödvändigt. Stor del av funktionaliteten i befintliga säkerhetsroller nyttjas ej.',
    businessValue:
      'Lägre licenskostnader för kunden och mer relevanta säkerhetsroller som är enklare att förvalta.',
    category: 'Security & Licensing',
  },
  {
    id: 49,
    title: 'DevOps Agent',
    submitter: 'Oscar Zeidler',
    description:
      'Agent för att ställa frågor och analysera Work Items i ett Azure DevOps-projekt.',
    userRoles: ['Applikationskonsult', 'SME', 'Projektledare', 'Lösningsarkitekt'],
    challenge: 'Tidskrävande att leta efter information i Azure DevOps.',
    businessValue:
      'Användarvänlig ansats till att söka och analysera information i Azure DevOps. Kan användas för att sammanställa status till projekt- och ledningsmöten.',
    category: 'Development & Tech',
  },
  {
    id: 50,
    title: 'Cash Flow Pulse Agent',
    submitter: 'Oscar Zeidler',
    description:
      'Agent för visualisering av Net Cash Position med KPI:er som Total Inflows, Total Outflows, Open Receivables, Pending Payables, Liquidity Forecast m.m.',
    userRoles: ['Finance Controller'],
    challenge:
      'Avsaknad av standardrapporter och grafiskt tilltalande visualiseringar i standard D365 F&O gör det svårt att få en överblick.',
    businessValue:
      'Skapar bättre förutsättningar kring datadrivet beslutsfattande kopplat till Cash Flow.',
    category: 'Finance',
  },
  {
    id: 51,
    title: 'WMS Exception Agent',
    submitter: 'Oscar Thorsson',
    description:
      'Agent som lyfter fram undantag som lagerpersonal behöver ta action på kopplat till det dagliga arbetet. KPI:er: Totalt antal avvikelser, Kritiska avvikelser, High Severity, Shipment at Risk, Avg Aging, Blocked Work.',
    userRoles: ['Lagerchef', 'Warehouse Manager'],
    challenge:
      'Avsaknad av standardrapporter och grafiskt tilltalande visualiseringar i standard D365 F&O gör det svårt att få en överblick.',
    businessValue:
      'Skapa bättre förutsättningar för att lagerpersonal skall kunna agera på avvikelser i tid och undvika driftstopp och leveransproblem.',
    category: 'Warehouse & Logistics',
  },
  {
    id: 52,
    title: 'Batch Telemetry Agent',
    submitter: 'Ajit Kumar Guttala',
    description:
      'Monitorerar och följer upp batchjobb samt avvikelser med hjälp av Azure App Insights och en Copilot Studio Agent.',
    userRoles: ['Systemadministratör', 'AM'],
    challenge:
      'Befintliga vyer i LCS håller på att fasas ut — krav på nya verktyg. Vid fel har tidigare rapporter varit svåra att nyttja för att analysera orsaken.',
    businessValue:
      'Överblick kring batchjobb och effektiv felsökning för att kunna agera på avvikelser i tid och undvika driftstopp.',
    category: 'System Administration',
  },
  {
    id: 53,
    title: 'Copy Batch Job Agent',
    submitter: 'Nurlin Aberra',
    description: 'Agent som kopierar batchjobb mellan miljöer.',
    userRoles: ['Systemadministratör'],
    challenge: 'Tidskrävande aktivitet som riskerar att bli fel när man gör det manuellt.',
    businessValue: 'Automatisering och tidsbesparing samt minskar risken för fel.',
    category: 'System Administration',
  },
];
