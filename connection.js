const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'password',
    database: 'tracker_db',
});

//Create employee
const createEmployee = (fName, lName, role, manager) => {
    console.log('Inserting a new employee...\n');
    const query = connection.query(
        'INSERT INTO employee SET ?',
        {
            first_name: fName,
            last_name: lName,
            role_id: role,
            manager_id: manager
        },
        (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} Employee inserted!\n`);
        }
    );
};

//Delete Employee
const deleteEmployee = (id) => {
    connection.query(
        'DELETE FROM employee WHERE ?',
        {
            id: id,
        },
        (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} employee deleted!\n`);
        }
    );
};

//Update Employee role
const updateEmployee = (id) => {
    const query = connection.query(
        'UPDATE employee SET ? WHERE ?',
        [
            {
                id: id,
            }
        ],
        (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} employees role updated!\n`);
        }
    );
}

//View a table
const viewTable = (table) => {
    const selectionString = 'SELECT * FROM ' + table;
    connection.query(selectionString, (err, res) => {
        if (err) throw err;
        console.table(res);
    });
}

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    viewTable('employee')
});
