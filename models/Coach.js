const {Roles} = require("./Roles");
module.exports = (sequelize, DataTypes) => {

    return sequelize.define('Coach', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },

        email :{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        password :{
                type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        userName :{
                type: DataTypes.STRING,
            allowNull: true,
        },
        fullName :{
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true,
            }
        },
        teamName :{
            type: DataTypes.STRING,
            allowNull: true,
        },
        experienceYears:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        age:{
            type: DataTypes.STRING,
            allowNull: true
        },
            role :{
                type: DataTypes.STRING,
                allowNull: true,
            },
        bio:{
            type: DataTypes.STRING,
            allowNull: true
        },
            profilePicture: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        dob:{
            type: DataTypes.DATE,
            allowNull: true
        }
    },
        {
            tableName: 'coach',
            timestamps: true,
            updatedAt: 'updatedAt',
            createdAt: 'createdAt',
        });

}