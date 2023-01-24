

async function update(modifiedEmployee) {
    try {
        const sql = 'update employee set firstname=?, lastname=?, ' +
            'departments=?. salary=? where id=?';//order is important, needs to be same as parameters:

        const parameters = [
            modifiedEmployee.firstname,
            modifiedEmployee.lastname,
            modifiedEmployee.department,
            modifiedEmployee.salary,
            modifiedEmployee.id
        ];
        const status = await db.dbQuery(sql, parameters);
        console.log(status);
    }
    catch (err) {
        console.log(err);
    }
}

async function add(employee){
    try{
        const parameters = [
            employee.id,
            employee.firstname,
            employee.lastname,
            employee.department,
            employee.salary
        ];
        const sql='insert into employee values(?,?,?,?,?)';

        const status = await db.doQuery;
    }
}