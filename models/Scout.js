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
                }
            },

            password :{
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                }
            },
        fullName :{
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true,
            }
        },
        userName:{
                type: DataTypes.STRING,
            allowNull: true,
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
            createdAt: 'createdAt',
        });
}