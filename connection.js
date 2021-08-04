const mysql = require('mysql');
const inquirer = require('inquirer');
const ctable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'tracker_db',
});

//Create department
const createDepartment = (name) => {
    connection.query(
        'INSERT INTO department SET ?',
        {
            name: name
        })
}

//Create role
const createRole = (title, salary, department) => {
    connection.query(
        'INSERT INTO role SET ?',
        {
            title: title,
            salary: salary,
            department_id: department
        })
}

//Create employee
const createEmployee = (fName, lName, role, manager) => {
    connection.query(
        'INSERT INTO employee SET ?',
        {
            first_name: fName,
            last_name: lName,
            role_id: role,
            manager_id: manager
        })
};

//Delete Employee

//Update Employee role
const updateEmployee = (role, id) => {
    connection.query(
        'UPDATE employee SET ? WHERE ?',
        [{
            role_id: role
        },
        {
            id: id,
        }]);
}

//View a table
const viewAll = async () => {
    await connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary,CONCAT(manager.first_name,  '  ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;`,
        (err, result) => {
            if (err) throw err;
            console.table(result)
        })
}

//View Departments
const viewDepartments = () => {
    connection.query('SELECT * FROM department', (err, result) => {
        if (err) throw err;
        console.table(result)
    })
}

//View Roles
const viewRoles = () => {
    connection.query('SELECT * FROM role', (err, result) => {
        if (err) throw err;
        console.table(result)
    })
}



//Get all managers
const getManagersList = () => {
    connection.query(
        `SELECT employee.id, employee.first_name,employee.last_name, role.title, department.name AS department, role.salary,CONCAT(manager.first_name, ' ' , manager.last_name) AS manager 
    FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id
  WHERE employee.manager_id is NULL`
        , (err, result) => {
            if (err) throw err;
            console.table(result)
        })
}


//Main function to run
async function run() {
    inquirer
        .prompt({
            name: "choice",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View departments",
                "View Roles",
                "Add employee",
                "Add department",
                "Add role",
                "Update employee by role",
                "Exit",
            ],
        })
        .then((answer) => {
            switch (answer.choice) {
                case "View all employees":
                    viewAll();
                   
                    break;

                case "View departments":
                    viewDepartments()
                   
                    break;

                case "View Roles":
                    viewRoles()
                   
                    break;

                case "Add employee":
                    createEmployee();
                    
                    break;
                case "Create role":
                    createRole()
                  
                    break;
                case "Update employee by role":
                    updateEmployee();
                   
                    break;

                case "Exit Application":
                    connection.end();
                    break;
            }
        });
    run()
};

connection.connect((err) => {
    if (err) throw err;

});

run();