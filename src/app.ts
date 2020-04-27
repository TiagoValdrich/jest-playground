import * as express from "express";
import { Database } from "./database/index";
import { User } from "./database/models/User";
import { Repository } from "typeorm";

const db: Database = new Database();
const app: express.Application = express();

app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
    return res.status(200).send("Application is running");
});

app.get('/user', async (req: express.Request, res: express.Response) => {
    try {
        const userRepository: Repository<User> = (await db.getConnection()).getRepository(User);
        const users = await userRepository.find();

        return res.status(200).json(users);
    } catch (error) {
        console.error('Unexpected error', error);
        return res.sendStatus(500);
    }
});

app.get('/user/:id', async (req: express.Request, res: express.Response) => {
    try {
        const userRepository: Repository<User> = (await db.getConnection()).getRepository(User);
        const user = await userRepository.findOne(req.params.id);

        return res.status(200).json(user);
    } catch (error) {
        console.error('Unexpected error', error);
        return res.sendStatus(500);
    }
});

app.post('/user', async (req: express.Request, res: express.Response) => {
    try {
        const userRepository: Repository<User> = (await db.getConnection()).getRepository(User);
        const user = await userRepository.create(req.body);
        const result = await userRepository.save(user);

        return res.status(200).send(result);
    } catch (error) {
        console.error('Unexpected error', error);
        return res.sendStatus(500);
    }
});

app.delete('/user/:id', async (req: express.Request, res: express.Response) => {
    try {
        const userRepository: Repository<User> = (await db.getConnection()).getRepository(User);
        await userRepository.delete(req.params.id);

        return res.status(200).send("User deleted!");
    } catch (error) {
        console.error('Unexpected error', error);
        return res.sendStatus(500);
    }
});

export default app;