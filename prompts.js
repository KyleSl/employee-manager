const mainPrompt = [
    {
        type: 'list',
        message: 'Please select an option: ',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee'],
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
        validate: function (input) {
            const departments = Department.findAll();
            if(departments.includes(input)){
                return true;
            }
            return false;
        }
    },
];

const addEmployeePrompt = [
    {
        type: 'input',
        message: 'Enter full employee name (first last): ',
        name: 'fullName',
    },
    {
        type: 'input',
        message: 'Enter the name of the role of the employee: ',
        name: 'role',
        validate: function (input) {
            const roles = Role.findAll();
            if(roles.includes(input)){
                return true;
            }
            return false;
        }
    },
    {
        type: 'input',
        message: 'Enter the name of the employee\'s manager (first last): ',
        name: 'manager',
        validate: function (input) {
            const employees = Employee.findAll();
            if(employees.includes(input)){
                return true;
            }
            return false;
        }
    }
];

module.exports = { mainPrompt, addDepartmentPrompt, addEmployeePrompt, addRolePrompt };