# Louis De Gruyter (180978ld)



- [x] Front-end Web Development
  - [GitHub repository](https://github.com/Web-IV/2223-frontendweb-LouisDeGruyter)
  - [Online versie](https://wherearemyclothes.onrender.com)
- [x] Web Services: GITHUB URL
  - [GitHub repository](https://github.com/Web-IV/2223-webservices-LouisDeGruyter)
  - [Online versie](https://webservices-louisdegruyter.onrender.com)

**Logingegevens**

- e-mailadres: demo@gmail.be
- Wachtwoord: Demo@mail

## Projectbeschrijving

Een gebruiker kan kleerkasten en kledingstukken toevoegen en kan zo kijken in welke kleerkast welke kledingstukken zich bevinden. Kan bijvoorbeeld gebruikt worden door een student die wilt weten welke kleren hij nog moet meenemen naar kot.
![eerd](/images/eerd.png)
## Screenshots

> Voeg enkele (nuttige!) screenshots toe die tonen wat de app doet.

## Behaalde minimumvereisten

> Duid per vak aan welke minimumvereisten je denkt behaald te hebben

### Front-end Web Development

- **componenten**

  - [x] heeft meerdere componenten - dom & slim (naast login/register)
  - [x] definieert constanten (variabelen, functies en componenten) buiten de component
  - [x] minstens één form met validatie (naast login/register)
  - [x] login systeem (eigen of extern zoals bv. Auth0)
<br />

- **routing**
  - [x] heeft minstens 2 pagina's (naast login/register)
  - [x] routes worden afgeschermd met authenticatie en autorisatie
<br />

- **state-management**

  - [x] meerdere API calls (naast login/register)
  - [x] degelijke foutmeldingen indien API call faalt
  - [x] gebruikt useState enkel voor lokale state
  - [ ] gebruikt Context, useReducer, Redux… voor globale state
<br />

- **hooks**

  - [x] kent het verschil tussen de hooks (useCallback, useEffect…)
  - [x] gebruikt de hooks op de juiste manier
<br />

- **varia**
  - [x] een aantal niet-triviale testen (unit en/of e2e en/of ui)
  - [x] minstens één extra technologie
  - [x] duidelijke en volledige README.md
  - [x] volledig en tijdig ingediend dossier


### Web Services

- **datalaag**

  - [x] voldoende complex (meer dan één tabel)
  - [x] één module beheert de connectie + connectie wordt gesloten bij sluiten server
  - [x] heeft migraties
  - [x] heeft seeds
<br />

- **repositorylaag**

  - [x] definieert één repository per entiteit (niet voor tussentabellen) - indien van toepassing
  - [x] mapt OO-rijke data naar relationele tabellen en vice versa
<br />

- **servicelaag met een zekere complexiteit**

  - [x] bevat alle domeinlogica
  - [x] bevat geen SQL-queries of databank-gerelateerde code
<br />

- **REST-laag**

  - [x] meerdere routes met invoervalidatie
  - [x] degelijke foutboodschappen
  - [x] volgt de conventies van een RESTful API
  - [x] bevat geen domeinlogica
  - [x] degelijke authorisatie/authenticatie op alle routes
<br />

- **varia**
  - [x] een aantal niet-triviale testen (min. 1 controller >=80% coverage)
  - [x] minstens één extra technologie
  - [x] duidelijke en volledige `README.md`
  - [x] maakt gebruik van de laatste ES6-features (object destructuring, spread operator...)
  - [x] volledig en tijdig ingediend dossier


## Projectstructuur

### Front-end Web Development

> Hoe heb je jouw applicatie gestructureerd (mappen, design patterns, hiërarchie van componenten, state...)?

Ik heb ervoor gezorgd dat alle files die code bevatten voor de werking van de api zich bevinden in de src folder en dat config files, testen en dergelijke zich erbuiten bevinden. Binnen de src folder heb ik files onderverdeeld in aparte lagen: de restlaag, de servicelaag en de datalaag.

### Web Services

> Hoe heb je jouw applicatie gestructureerd (mappen, design patterns...)?

## Extra technologie

### Front-end Web Development

> Wat is de extra technologie? Hoe werkt het? Voeg een link naar het npm package toe!

### Web Services

De extra technologie is [Sequelize](https://github.com/sequelize/sequelize), Sequelize is een JavaScript-bibliotheek die wordt gebruikt voor het maken en uitvoeren van database-queries in Node.js-toepassingen. Sequelize maakt gebruik van objectrelational mapping (ORM), wat betekent dat het de tabellen in een database omzet naar JavaScript-objecten die je kunt gebruiken in je toepassing.


## Testresultaten

### Front-end Web Development

> Schrijf hier een korte oplijsting en beschrijving van de geschreven testen

### Web Services

> Schrijf hier een korte oplijsting en beschrijving van de geschreven testen + voeg een screenshot van de coverage en uitvoering toe
Voor Users, kleerkasten en kledingstukken wordt telkens het opvragen van alles, het opvragen bij id, het updaten, het verwijderen en het aanmaken gecontroleerd. Bij kledingstukken wordt ook nog het opvragen van de user of kleerkast waartoe het behoort gecontroleerd. Bij kleerkasten wordt ook gecontroleerd bij welke user het hoort en welke kledingstukken het bezit.
Bij de users wordt ook nog eens gecontroleerd welke kledingstukken en kleerkasten het bezit

![coverage](/images/coverage.png)
![uitvoering](/images/test.png)
## Gekende bugs

### Front-end Web Development
Geen gekende bugs

### Web Services
Geen gekende bugs

## Wat is er verbeterd/aangepast?

> Deze sectie is enkel voor 2e zittijd, verwijder deze in 1e zittijd.

### Front-end Web Development

- Dit en dat

### Web Services

- Oh en dit ook
