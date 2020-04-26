const request = require('supertest');
const app = require('./app');

describe('Testing application routes', () => {
    test('the main route / should have status 200', async () => {
        const response = await request(app).get("/");
        return expect(response.statusCode).toBe(200);
    });

    test('another way to test the main route / should have status 200', () => {
        return request(app)
            .get("/")
            .expect(200);
    });

    test('expect get user with age 20', async () => {
        const response = await request(app).get('/user');
        return expect(response.body.age).toBe(20);
    });
});