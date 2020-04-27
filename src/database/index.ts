import { createConnection, Connection } from "typeorm";

export class Database {

    private connection: Connection;
    private dbName: string = process.env.NODE_ENV != 'dev' ? 'test' : 'application';

    async getConnection(): Promise<Connection> {
        try {
            if (this.connection) {
                return this.connection;
            }

            this.connection = await createConnection({
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "root",
                password: "",
                database: this.dbName,
                entities: [
                    __dirname + "/models/*.ts"
                ],
                synchronize: true,
            });

            return this.connection;
        } catch (err) {
            console.error("Error creating connection to database: shutting down application", err);
            process.exit(1);
        }
    }

    async closeConnection(): Promise<void> {
        try {
            if (this.connection) {
                return await this.connection.close();
            }
    
            return Promise.resolve();
        } catch (err) {
            console.error("Erro closing conneciton", err);
            return Promise.reject(err);
        }
    }
}