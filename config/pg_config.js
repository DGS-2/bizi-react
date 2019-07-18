const { Client } = require('pg').Client;
export const client = new Client({
    user: 'scott',
    host: 'localhost',
    database: 'taskr',
    password: 'blaster34CANNON#$',
    port: 5432
});

