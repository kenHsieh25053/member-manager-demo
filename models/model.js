const sequelize = require('../db/db');
const Sequelize = require('sequelize');

const bcrypt = require('bcryptjs');


// Define admin's table
const Admin = sequelize.define('admin', {
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
Admin.hasMany(Member);
Member.belongsTo(Admin);


// Encryt admin's password before inserting data
Admin.beforeCreate((admin) => {
    return bcrypt.hash(admin.password, 8).then(hashedPw => {
        admin.password = hashedPw;
    });
});


// Create admin and member table
// Admin.sync({
//     force: true
// })

// Member.sync({
//     force: true
// })

module.exports = {
    Admin,
    Member
};