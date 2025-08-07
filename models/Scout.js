module.exports = (sequelize, DataTypes) => {

    return sequelize.define('Scout', {
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
        fullName :{
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true,
            }
        },

        organisation : {
            type: DataTypes.STRING,
            allowNull: true,
        },

        location : {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bio:{
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
        {
            tableName: 'scout',
            timestamps: true,
            updatedAt: 'updatedAt',
        });
}