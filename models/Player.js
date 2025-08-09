module.exports = (sequelize, DataTypes) => {
        return sequelize.define('Player', {

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
            role :{
                type: DataTypes.STRING,
                allowNull: true,
            },
            profilePicture: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            userName :{
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

    }, {
        tableName: 'player',
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt',

        });


};
