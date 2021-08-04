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
        }
    );
};

//Delete Employee

//Update Employee role
const updateEmployee = (role, id) => {
    const query = connection.query(
        'UPDATE employee SET ? WHERE ?',
        [{
            role_id: role
        },
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
    const selectionString = "SELECT employee.id, employee.first_name,employee.last_name, role.title, department.name AS department, role.salary,CONCAT(manager.first_name,  '  ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;";
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

//View Roles
const viewRoles = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.log('')
        console.table(res)
    })
}

//Update Manager
const updateEmployeeManager = (manager, id) => {
    connection.query(
        `UPDATE employee SET ? where ?`,
        [
            {
                manager_id: manager
            },
            {
                id: id
            }
        ]
    );
}

//Find all by department
const findAllEmployeesByDepartment = (dept) => {
    connection.query(` SELECT employee.id, employee.first_name,employee.last_name, role.title, department.name AS department, role.salary,CONCAT(manager.first_name, ' ' , manager.last_name) AS manager 
    FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id
  WHERE ?`,
        [{
            department_id: dept
        }
        ]);
};

//Find all by manager
const findAllEmployeesByManager = (manager) => {
    connection.query(` SELECT employee.id, employee.first_name,employee.last_name, role.title, department.name AS department, role.salary,CONCAT(manager.first_name, ' ' , manager.last_name) AS manager 
  FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id
WHERE ?`,
        [{
            manager_id: manager
        }]);
};

//Get all managers
const getManagersList = () => {
    connection.query(
        `SELECT employee.id, employee.first_name,employee.last_name, role.title, department.name AS department, role.salary,CONCAT(manager.first_name, ' ' , manager.last_name) AS manager 
    FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id
  WHERE employee.manager_id is NULL`
    );
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
                viewRoles();
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