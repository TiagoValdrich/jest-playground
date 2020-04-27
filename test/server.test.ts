import app from "../src/app";
import * as request from "supertest";
import { Database } from "../src/database";
import { User } from "../src/database/models/User";

beforeAll(async done => {
    try {
        const db: Database = new Database();
        const connection = await db.getConnection();
        const userMetada = connection.getMetadata(User);
        const userRepository = await connection.getRepository(User);

        // Clear database for tests
        await userRepository.query(`TRUNCATE ${userMetada.tableName}`);
        await connection.close();

        done();
    } catch (err) {
        done (err);
    }
});

describe('Testing Express API', () => {
    test('root route "/" should have response with status 200', async () => {
        const response = await request(app).get("/");
        return expect(response.status).toBe(200);
    });
});

describe('Testing User routes', () => {
    test('Should create an user', async () => {
        const sampleUser = {
            id: null,
            name: "Test user",
            age: 20,
            email: "test@email.com"
        };
        const user = await request(app)
            .post("/user")
            .send(sampleUser);

        expect(user.status).toBe(200);

        expect(user.body).toEqual(
            expect.objectContaining({
                name: sampleUser.name,
                age: sampleUser.age,
                email: sampleUser.email
            })
        );

        expect(user.body).toHaveProperty('id', 1);
    });

    test('Find users should return an array of users', async () => {
        const users = await request(app).get("/user");

        expect(Array.isArray(users.body)).toBeTruthy();
        expect(users.body.length).toBeGreaterThanOrEqual(1);
        expect(users.body[0]).toHaveProperty('name');
        expect(users.body[0]).toHaveProperty('age');
    });

    test('Response should have a user object', async () => {
        const user = await request(app).get("/user/1");

        expect(user.body).toHaveProperty('name');
        expect(user.body).toHaveProperty('age');
        expect(user.body).toHaveProperty('email');
    });

    test('Delete route should delete an user with id 1, returning status 200', async () => {
        const response = await request(app).delete("/user/1");
        return expect(response.status).toBe(200);
    });
});