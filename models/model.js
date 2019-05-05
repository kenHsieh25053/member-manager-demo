const sequelize = require('../db/db');
const Sequelize = require('sequelize');

const bcrypt = require('bcryptjs');
const uuid = require('uuid');


// Define admin's table
const Admin = sequelize.define('admin', {
    id: {
        type: Sequelize.UUID,
        unique: true,
        primaryKey: true
    },
    account: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [7, ]
        }
    }
});

// Define member's table
const Member = sequelize.define('member', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    birthday: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
});


// Associate with member's table
Admin.hasMany(Member, {
    foreignKey: 'adminId'
});
Member.belongsTo(Admin);


// Encryt admin's password before inserting data
Admin.beforeCreate((admin) => {
    return bcrypt.hash(admin.password, 8).then(hashedPw => {
        admin.password = hashedPw;
    });
});

// Set up uuid for admin id 
Admin.beforeCreate((admin) => {
    return admin.id = uuid()
})


// Create admin and member table
// Admin.sync({
//     force: false
// })

// Member.sync({
//     force: false
// })

module.exports = {
    Admin,
    Member
};