'use strict';

const mariadb = require('mariadb');
//run testA function
testA();


//helper functions
async function testA() {
    const options = {
        host: 'localhost', //the db host
        port: 3306, //default db port
        user: 'zeke',
        password: '1234',
        database: 'employeeDb'
        /* allowPublicKeyRetrieval:true */ //if using mySQL
    };

    const connection = await mariadb.createConnection(options);

    console.log('######### test 1 ##########');


    delete result.meta; //removes meta data from response
    console.log(result);

    console.log('#########  test 2 #########');
    let result = await connection.query('select * from employee');
    delete result.meta; //removes meta data from response
    console.log(result);

    result = await
        //console.log(Object.values(result[0]));
        console.log(result.map(item => Object.values(item)));


    console.log('############ test 3 ###########');
    result = await connection.query(
        'select * from employee where id=?', [1]
    );
    delete result.meta;
    console.log(result);

    connection.end();

}
/* 
const connection= await mariadb.createConnection(options);

let result = await connection.query('select * from employee');
// console.log(result);
delete result.meta; //removing meta from result
console.log(result);
// console.log(Object.values(result[0]));
// console.log(result.map(item=>Object.values(item)));

console.log('######## test 2 ######');
result = await connection.query({
    rowsAsArray:true, sql:'select * from employee'
});
delete result.meta;
console.log(result);
 */