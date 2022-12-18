# Examenopdracht Web Services

- Student: Louis De Gruyter
- Studentennummer: 180978ld
- E-mailadres: louis.degruyter@student.hogent.be


## Opstarten
1) Maak .env bestand aan met volgende variabelen:
- NODE_ENV=development
DATABASE_USERNAME="180978ld"
DATABASE_PASSWORD="sfhay2uXYVZarLqM3fv9"
DATABASE_NAME="180978ld"
DATABASE_HOST="vichogent.be"
DATABASE_DIALECT="mysql"
DATABASE_PORT=40043
AUTH_JWKS_URI='https://web-louisdg.eu.auth0.com/.well-known/jwks.json'
AUTH_AUDIENCE='https://api/web-louisdg'
AUTH_ISSUER='https://web-louisdg.eu.auth0.com/'
AUTH_USER_INFO='https://web-louisdg.eu.auth0.com/userinfo'

2) Voer de volgende commando(s) uit:
yarn start

## Testen

1) Maak .env.test bestand aan met volgende variabelen:
NODE_ENV=test
DATABASE_USERNAME="180978ld"
DATABASE_PASSWORD="sfhay2uXYVZarLqM3fv9"
DATABASE_NAME="180978ld"
DATABASE_HOST="vichogent.be"
DATABASE_DIALECT="mysql"
DATABASE_PORT=40043
AUTH_JWKS_URI='https://web-louisdg.eu.auth0.com/.well-known/jwks.json'
AUTH_AUDIENCE='https://api/web-louisdg'
AUTH_ISSUER='https://web-louisdg.eu.auth0.com/'
AUTH_USER_INFO='https://web-louisdg.eu.auth0.com/userinfo'
AUTH_TEST_USER_USER_ID="auth0|639c8f3957a98f052c135afa"
AUTH_TEST_USER_USERNAME="e2e-testing@gmail.be"
AUTH_TEST_USER_PASSWORD="e2e-testing"
AUTH_TOKEN_URL="https://web-louisdg.eu.auth0.com/oauth/token"
AUTH_CLIENT_ID="YpzFIr48ow6UeAC6iK7AR0u7YIRKAkVd"
AUTH_CLIENT_SECRET="iv1v7WGS7kZAixDs68Hf7rekyX7rq1Xx01axPl62koJof92FZ8pw_eJj7ApdlTOk"
AUTH_USER_INFO='https://web-louisdg.eu.auth0.com/userinfo'

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



