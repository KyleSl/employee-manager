const sequelize = require("./config/connection");
const {Department, Employee, Role} = require('./models');
const {mainPrompt, addEmployeePrompt, addRolePrompt, addDepartmentPrompt} = require('./prompts');
const inquire = require('inquirer');
