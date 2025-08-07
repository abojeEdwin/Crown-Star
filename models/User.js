//
// const { Roles } = require("./Roles");
//
// module.exports = (sequelize, DataTypes) => {
//     return sequelize.define('User', {
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         role: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             defaultValue: Roles.USER,
//             validate: {
//                 isIn: [[Roles.USER, Roles.COACH, Roles.PLAYER, Roles.SCOUT]]
//             }
//         }
//     }, {
//         tableName: 'users',
//         timestamps: true,
//         updatedAt: 'updatedAt',
//     });
//
// };