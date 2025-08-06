module.exports = (sequelize, DataTypes) => {
        return sequelize.define('Player', {
        userId: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        fullName :{
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true,
            }
        },
        username :{
            type: DataTypes.STRING,
            allowNull: true,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: true
        },
        height: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        clubTeam: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: true
        },
        age:{
            type: DataTypes.STRING,
            allowNull: true
        },
        bio:{
            type: DataTypes.STRING,
            allowNull: true
        },
        dob:{
            type: DataTypes.DATE,
            allowNull: true
        },
        email:{
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isEmail: true,
                unique: true,
            }
        }

    }, {
        tableName: 'player',
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt',



        });


};
