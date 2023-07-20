const sequelize = require("./config/connection");
const {Department, Employee, Role} = require('./models');
const {mainPrompt, addEmployeePrompt, addRolePrompt, addDepartmentPrompt} = require('./prompts');
const inquire = require('inquirer');
const asTable = require('as-table');



sequelize.sync({ force: false })
.then(() => {
    mainScreen();
});

function mainScreen () {
    inquire.prompt(mainPrompt)
    .then((a) => { 
        a = a.option;
        switch (a){
            case 'View all departments':
                viewDeparments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update employee':
                break;
            default:
                return mainScreen();
        }
    });
}

async function viewDeparments () {
    const departments = await Department.findAll({ attributes: ['id', 'title'] });
    console.log('\n\n' + asTable(JSON.parse(JSON.stringify(departments))) + '\n');
    return mainScreen();
}

async function viewRoles () {
    const roles = await Role.findAll({ attributes: ['id', 'title', 'salary', 'department_id'] });
    console.log('\n\n' + asTable(JSON.parse(JSON.stringify(roles))) + '\n');
    return mainScreen();
}

async function viewEmployees () {
    const employees = await Employee.findAll({ attributes: ['id', 'first_name', 'last_name', 'role_id', 'manager_id'] });
    console.log('\n\n' + asTable(JSON.parse(JSON.stringify(employees))) + '\n');
    return mainScreen();
}

async function addDepartment () {
    inquire.prompt(addDepartmentPrompt)
    .then((a) => {
        Department.create({
            title: a.departmentName,
        });
    })
    .then(() => { return mainScreen(); });
}

async function addRole () {
    inquire.prompt(addRolePrompt)
    .then( async (a) => {
        const department = await Department.findOne({ where: { title: a.roleDepartment }});
        Role.create({
            title: a.roleName,
            salary: a.salary,
            department_id: department.dataValues.id,
        })
    })
    .then(() => { return mainScreen(); });
}

async function addEmployee () {
    inquire.prompt(addEmployeePrompt)
    .then( async (a) => {
        let managerid;
        const role = await Role.findOne({ where: { title: a.role }});
        if(a.managerid === ''){
            managerid = null;
        }else{
            managerid = a.managerid;
        }
        Employee.create({
            first_name: a.firstName,
            last_name: a.lastName,
            role_id: role.dataValues.id,
            manager_id: managerid,
        })
    })
    .then(() => { return mainScreen(); })
}


