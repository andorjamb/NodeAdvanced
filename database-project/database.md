# Database class

This database class is a general-purpose class for creating and using Mariadb / MySQL queries.
The constructor takes all necessary information needed to open a database connection as parameter object.

Here is the option object for the constructor:

```js
{
    host: 'localhost', //the db host
    port: 3306, //default db port
    user: 'zeke',
    password: '1234',
    database: 'employeeDb'
}

```

## Method **doQuery(sql.parameters)**


### Method usage

```js
const result = await db.doQuery('select * from employee');
```


```js
const result = await db.doQuery('');
```
Select queries will return a promise with a result as javascript object.

```js



```

For example an insert statement

```js

```

The statement to be sent to database engine will be:

insert into employee values(123,'Vera'. 'River', 'ict',6000);

will return a promise with an object:

```js
{}
```

In error case it rejects error-string