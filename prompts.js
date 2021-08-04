const inquirer = require('inquirer');
const ctable = require('console.table');
const mysql = require('mysql');
const {
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
} = require('./queries')

async function viewEmployees() {
    let employees = await findAllEmployees();
    let table = ctable.getTable([], employees);
    console.log(table);
  }

