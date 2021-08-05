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
const createEmployee = async (fName, lName, role, manager) => {
    await connection.query(
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

async function updateEmployeesRole() {

    const updateRolePrompt = [
        {
            type: "input",
            name: "employee",
            message: "Enter the id of the employee you would like to update",
        },
        {
            type: "input",
            name: "role",
            message: "Which role id would like to change to?",
        },
    ];
    inquirer.prompt(updateRolePrompt).then((answer) => {

        async function updateEmployeeByRole(selectedRole, selectedEmployeeId) {
            await updateEmployee(
                selectedRole,
                selectedEmployeeId
            );
            console.log("Employee Updated!");
            start();
        }
        updateEmployeeByRole(answer.employee, answer.role);
    });
}

//View a table
const viewAll = async () => {

    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary,CONCAT(manager.first_name,  '  ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;`,
        (err, result) => {
            if (err) throw err;
            console.table(result)
        })
}

//View Departments
const viewDepartments = async () => {
    await connection.query('SELECT * FROM department', (err, result) => {
        if (err) throw err;
        console.table(result)
    })
}

//View Roles
const viewRoles = async () => {
    await connection.query('SELECT * FROM role', (err, result) => {
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

//Add Employee
async function addEmployee() {

    inquirer.prompt([
        {
            type: "input",
            name: "firstname",
            message: "Please add your first name",
        },
        {
            type: "input",
            name: "lastname",
            message: "Please add your last name",
        },
        {
            type: "input",
            name: "role",
            message: "Please add your role id"
        },
        {
            type: "input",
            name: "manager",
            message: "Please add your manager id"
        },
    ]).then((answer) => {
        async function employeeInsert(firstName, lastName, role, manager) {
            await createEmployee(firstName, lastName, role, manager);
        }
        employeeInsert(answer.firstname, answer.lastname, answer.role, answer.manager);

        start();
    });
}

connection.connect((err) => {
    if (err) throw err;

});

const start = async () => {
    inquirer
        .prompt({
            name: "opening",
            type: "list",
            message: "Welcome! What would you like to do?",
            choices: [
                "View all employees",
                "Add employee",
                "View departments",
                "View roles",
                "Add a role",
                "add a department",
                "Update employee by role",
                "Exit Application",
            ],
        })
        .then(async (answer) => {
            switch (answer.opening) {
                case "View all employees":
                    viewAll();
                    start();
                    break;

                case "view departments ":
                    viewDepartments()

                    break;
                case "Add employee":
                    addEmployee()
                    break;
                case "View roles ":
                    viewRoles()
                    break;

                case "Add a role ":
                    createRole()
                    break;

                case "Add department ":
                    createDepartment()
                    break;

                case "Update employee by role":
                    updateEmployeesRole();
                    break;

                case "Exit Application":
                    connection.end();
                    break;
            }
        });
};

start()