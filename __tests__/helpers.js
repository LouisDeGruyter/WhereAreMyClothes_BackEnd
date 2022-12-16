const axios = require('axios');
const config = require('config');
const supertest = require('supertest');

const createServer = require('../src/createServer');

const fetchAccessToken = async () => {
  const response = await axios.post(process.env.AUTH_TOKEN_URL, {
    grant_type: 'password',
    username: process.env.AUTH_TEST_USER_USERNAME,
    password: process.env.AUTH_TEST_USER_PASSWORD,
    audience: process.env.AUTH_AUDIENCE,
    scope: 'openid profile email offline_access',
    client_id: process.env.AUTH_CLIENT_ID,
    client_secret: process.env.AUTH_CLIENT_SECRET,
  }, {
    headers: { "Accept-Encoding": "gzip,deflate,compress" } 
  });

  return response.data.access_token;
};

/**
 * Ensure a server instance is running.
 *
 * @param {Function} setter - Setter which gives access to the supertest agent and the Knex instance
 *
 * @returns {supertest.SuperAgentTest} A supertest agent.
 */
const withServer = (setter) => {
  let server;

  beforeAll(async () => {
    server = await createServer();
    const token = await fetchAccessToken();

    setter({
      request: supertest(server.getApp().callback()),
      authHeader: `Bearer ${token}`,
    });
  });

  afterAll(async () => {
    // Cleanup resources!
    await server.stop();
  });
};

module.exports = {
  fetchAccessToken,
  withServer,
};