const request = require('supertest');
const { app } = require('./index');

describe('GET /healthcheck', () => {
  it('should respond with a 200 status code', async () => {
    const response = await request(app).get('/healthcheck');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('OK');
  });
});