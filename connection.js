const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { getAction, newEmployeePrompt, newDepartment, newRole } = require('./prompts')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'tracker_db',
});

//Create department
const createDepartment = (name) => {
    const query = connection.query(
        'INSERT INTO department SET ?',
        {
            name: name
        },
        (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} department inserted!\n`);
            console.log('')
        }
    )
}

//Create role
const createRole = (title, salary, department) => {
    const query = connection.query(
        'INSERT INTO role SET ?',
        {
            title: title,
            salary: salary,
            department_id: department
        },
        (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} role inserted!\n`);
            console.log('')
        }
    )
}

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
            console.log('')
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
            console.log('')
        }
    );
}

//View a table
const viewTable = () => {
    const selectionString = "SELECT employee.id, first_name, last_name, title, salary, name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id";
    connection.query(selectionString, (err, res) => {
        if (err) throw err;
        console.log('')
        console.table(res);
    });
}

//View Departments
const viewDepartments = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.log('')
        console.table(res)
    })
}

async function run() {
    connection.connect((err) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);
    });

    let running = true;
    while (running == true) {
        const action = await getAction();
        switch (action) {
            case 'View Employees':
                viewTable();
                break;
            case 'View Departments':
                viewDepartments();
                break;
            case 'View Roles':

                break;
            case 'Add Employee':
                const employee = await newEmployeePrompt();
                let roleId;
                switch (employee.department) {
                    case 'Software Engineer':
                        roleId = 1;
                        break;
                    case 'Sales Lead':
                        roleId = 2;
                        break;
                    case 'Sales Person':
                        roleId = 3;
                        break;
                    case 'Lead Engineer':
                        roleId = 4;
                        break;
                    case 'Lawyer':
                        roleId = 5;
                        break;
                    default:
                        roleId = 6;
                        break;
                }
                createEmployee(employee.fName, employee.lName, roleId)
                break;
            case 'Add Department':
                const department = await newDepartment()
                createDepartment(department)
                break;
            case 'Add Role':
                const role = await newRole()
                createRole(role)
                break;
            default:
                updateEmployee()
                break;
        }
    }

}

run();