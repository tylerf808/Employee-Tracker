const connection = require('./connection');

//Create department
const createDepartment = (name) => {
    return connection.query(
        'INSERT INTO department SET ?',
        {
            name: name
        })
}

//Create role
const createRole = (title, salary, department) => {
    return connection.query(
        'INSERT INTO role SET ?',
        {
            title: title,
            salary: salary,
            department_id: department
        })
}

//Create employee
const createEmployee = (fName, lName, role, manager) => {
    return connection.query(
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
    return connection.query(
        'UPDATE employee SET ? WHERE ?',
        [{
            role_id: role
        },
        {
            id: id,
        }]);
}

//View a table
const viewTable = () => {
    return connection.query(`SELECT employee.id, employee.first_name,employee.last_name, role.title, department.name AS department, role.salary,CONCAT(manager.first_name,  '  ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;`)
}

//View Departments
const viewDepartments = () => {
    return connection.query('SELECT * FROM department')
}

//View Roles
const viewRoles = () => {
    return connection.query('SELECT * FROM role')
}

//Update Manager
const updateEmployeeManager = (manager, id) => {
    return connection.query(
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
    return connection.query(` SELECT employee.id, employee.first_name,employee.last_name, role.title, department.name AS department, role.salary,CONCAT(manager.first_name, ' ' , manager.last_name) AS manager 
    FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id
  WHERE ?`,
        [{
            department_id: dept
        }
        ]);
};

//Find all by manager
const findAllEmployeesByManager = (manager) => {
    return connection.query(` SELECT employee.id, employee.first_name,employee.last_name, role.title, department.name AS department, role.salary,CONCAT(manager.first_name, ' ' , manager.last_name) AS manager 
  FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id
WHERE ?`,
        [{
            manager_id: manager
        }]);
};

//Get all managers
const getManagersList = () => {
    return connection.query(
        `SELECT employee.id, employee.first_name,employee.last_name, role.title, department.name AS department, role.salary,CONCAT(manager.first_name, ' ' , manager.last_name) AS manager 
    FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id
  WHERE employee.manager_id is NULL`
    );
}

//Update employee's manager
const updateEmployeeManager = (manager, id) => {
    return connection.query(
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

module.exports = {
    createRole,
    updateEmployeeManager,
    getManagersList,
    findAllEmployeesByManager,
    updateEmployeeManager,
    createDepartment,
    findAllEmployeesByDepartment,
    viewDepartments,
    viewRoles,
    createEmployee
}