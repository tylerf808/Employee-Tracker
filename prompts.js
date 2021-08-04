const inquirer = require('inquirer');
const ctable = require('console.table');
const mysql = require('mysql');
const connection = require('./connection')

const {
    createRole,
    getManagersList,
    findAllEmployeesByManager,
    updateEmployeeManager,
    createDepartment,
    findAllEmployeesByDepartment,
    viewDepartments,
    viewRoles,
    viewAll,
    createEmployee
} = require('./queries')

async function viewEmployees() {
    let employees = await viewAll();
    let table = console.table(employees);
    console.log(table);
}

viewEmployees();