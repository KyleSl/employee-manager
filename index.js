const sequelize = require("./config/connection");
const {Department, Employee, Role} = require('./models');
const {mainPrompt, addEmployeePrompt, addRolePrompt, addDepartmentPrompt} = require('./prompts');
const inquire = require('inquirer');

const noLog = { logging: false };

sequelize.sync({ force: false, logging: false })
.then(() => {
    inquire.prompt(mainPrompt)
    .then((a) => { console.log(a) });
});



