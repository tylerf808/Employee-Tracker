const inquirer = require('inquirer');

function getAction() {
    const answer = inquirer.prompt([
        {
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View Employees', 'View Departments', 'View Roles', 'Add Employee', 'Add Department', 'Add Role', 'Update Employee Role']
        }
    ]).then((answers) => {
        return answers.action;
    })
    return answer;
};

function newEmployeePrompt() {
    const answer = inquirer.prompt([
        {
            name: 'fName',
            type: 'input',
            message: 'What is the employees first name?'
        },
        {
            name: 'lName',
            type: 'input',
            message: 'What is the employees last name?'
        },
        {
            name: 'department',
            type: 'list',
            message: 'What is the employees role?',
            choices: ['Software Engineer', 'Sales Lead', 'Sales Person', 'Lead Engineer', 'Lawyer', 'Legal Team Lead']
        }
    ]).then((answers) => {
        return answers;
    })
    return answer;
}

function newDepartment() {
    const answer = inquirer.prompt([
        {
            name: 'department',
            type: 'input',
            message: 'What is the department called?',
        }
    ]).then((answers) => {
        return answers.department;
    })
    return answer; 
}

function newRole() {
    const answer = inquirer.prompt([
        {
            name: 'role',
            type: 'input',
            message: 'What is the role called?',
        }
    ]).then((answers) => {
        return answers.role;
    })
    return answer; 
}

module.exports = { newEmployeePrompt, getAction, newDepartment, newRole }