'use strict';

const mariaDB = require('./database')

const options = {
    host: 'localhost', //the db host
    port: 3306, //default db port
    user: 'zeke',
    password: '1234',
    database: 'employeeDb'
}

const db = new mariaDB(options);

(async () => {
    try {
        const result = await db.doQuery()

    }
    catch (err) {
        console.log(err);
    }

})