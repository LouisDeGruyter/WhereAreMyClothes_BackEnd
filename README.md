# Examenopdracht Web Services

- Student: Louis De Gruyter
- Studentennummer: 180978ld
- E-mailadres: louis.degruyter@student.hogent.be


## Opstarten
1) Maak .env bestand aan met volgende variabelen:  
```.env
NODE_ENV=development  
DATABASE_USERNAME="root"  
DATABASE_PASSWORD=""  
DATABASE_NAME="180978ld"  
DATABASE_HOST="localhost"  
DATABASE_DIALECT="mysql"  
DATABASE_PORT=3306  
AUTH_JWKS_URI="https://{TENANT}/.well-known/jwks.json"
AUTH_AUDIENCE="{API-IDENTIFIER}"
AUTH_ISSUER="https://{TENANT}"
AUTH_USER_INFO="https://{TENANT}/userinfo"
```

2) Voer de volgende commando(s) uit:  
sequelize db:create
yarn start  

## Testen

1) Maak .env.test bestand aan met volgende variabelen:  
```.env.test
NODE_ENV=development  
DATABASE_USERNAME="root"  
DATABASE_PASSWORD=""  
DATABASE_NAME="test180978ld"  
DATABASE_HOST="localhost"  
DATABASE_DIALECT="mysql"  
DATABASE_PORT=3306  
AUTH_JWKS_URI="https://{TENANT}/.well-known/jwks.json"
AUTH_AUDIENCE="{API-IDENTIFIER}"
AUTH_ISSUER="https://{TENANT}"
AUTH_USER_INFO="https://{TENANT}/userinfo"
AUTH_TOKEN_URL="https://{TENANT}/oauth/token"
AUTH_CLIENT_ID="{YOUR-CLIENT-ID}}"
AUTH_CLIENT_SECRET="{YOUR-CLIENT-SECRET}"
AUTH_TEST_USER_ID="{YOUR-TEST-USERS-AUTH0ID}"
AUTH_TEST_USER_USERNAME="{YOUR-TEST-USER-USERNAME}"
AUTH_TEST_USER_PASSWORD="{YOUR-TEST-USER-PASSWORD}"  
```
2) Voer de volgende commando(s) uit:  
yarn test  

3) Voer de volgende commando(s) uit om coverage te testen:  
yarn test:coverage  

## Seeds

1) Voer de volgende commando(s) uit:  
  1.1 yarn seed:prepare  
  1.2: wanneer de volgende melding verschijnt in de console druk ctrl+c om de server terug te sluiten.  
  year-month-xxTxx:xx:xx.xxxZ | info | Server started on port 9000 | {"NODE_ENV":"development"}  
2) Voer de volgende commando(s) uit:  
    yarn seed  
    
## Migrations:  
1) Voer de volgende commando(s) uit:  
yarn migrate  



