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
                isEmail: true,
                unique: true,
                is: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            }
        },

        password :{
                type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [8, 20],
                is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            }
        },
        username :{
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
        bio:{
            type: DataTypes.STRING,
            allowNull: true
        },
        role:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: Roles.COACH,
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
        });

}