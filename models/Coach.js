module.exports = (sequelize, DataTypes) => {

    const Coach = sequelize.define('Coach', {
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
        teamName :{
            type: DataTypes.STRING,
            allowNull: true,
        },
        experienceYears:{
            type: DataTypes.STRING,
        },
        phone:{
            type: DataTypes.STRING,
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
        }
    },
        {
            tableName: 'coach',
            timestamps: true,
            updatedAt: 'updatedAt',
            createdAt: 'createdAt',
        });

    Coach.associate = (models) => {
        Coach.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user',
                onDelete: 'CASCADE'
        });
};
    return Coach;

}