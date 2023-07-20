const {Department, Employee, Role} = require('./models');

const mainPrompt = [
    {
        type: 'list',
        message: '\nRemember you can use Ctrl + c to exit. \nPlease select an option: ',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee'/*, 'Update employee'*/],
        name: 'option',
    }
];

const addDepartmentPrompt = [
    {
        type: 'input',
        message: 'Enter the name of new department: ',
        name: 'departmentName'
    }
];

const addRolePrompt = [
    {
        type: 'input',
        message: 'Enter the name of new role: ',
        name: 'roleName'
    },
    {
        type: 'number',
        message: 'Enter salary of new role: ',
        name: 'salary'
    },
    {
        type: 'input',
        message: 'Enter name of department that the new role belongs to: ',
        name: 'roleDepartment',
        validate: async function (input) {
            const department = await Department.findOne({ where: { title: input }});
            if(department !== null){
                return true;
            }
            return false;
        }
    },
];

const addEmployeePrompt = [
    {
        type: 'input',
        message: 'Enter employee first name: ',
        name: 'firstName',
    },
    {
        type: 'input',
        message: 'Enter employee last name: ',
        name: 'lastName',
    },
    {
        type: 'input',
        message: 'Enter the name of the role of the employee: ',
        name: 'role',
        validate: function (input) {
            const role = Role.findOne({ where: { title: input }});
            if(role !== null){
                return true;
            }
            return false;
        }
    },
    {
        type: 'input',
        message: 'Enter the id of the employee\'s manager: ',
        name: 'managerid',
        validate: function (input) {
            if(input !== ''){
                const employee = Employee.findByPk(input);
                if(employee !== null){
                    return true;
                }
                return false;
            }
            return true;
        }
    }
];

module.exports = { mainPrompt, addDepartmentPrompt, addEmployeePrompt, addRolePrompt };