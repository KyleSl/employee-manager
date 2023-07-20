const Department = require('./Department');
const Role = require('./Role');
const Employee = require('./Employee');

Department.hasMany(Role, {
    foreignKey: 'department_id'
});

Role.hasMany(Employee, {
    foreignKey: 'role_id'
})

module.exports = { Department, Role, Employee };