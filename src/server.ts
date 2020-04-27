import app from "./app";
import { Database } from "./database";

const db: Database = new Database();

// Runs connection to sync tables
db.getConnection().then(connection => {
    app['dbConnection'] = connection;
    app.listen('3000', () => {
        console.log('Application is running!');
    });

    connection.close();
}).catch(err => {
    console.error("Unable to sync database", err);
    process.exit(1);
});