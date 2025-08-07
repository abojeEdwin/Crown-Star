const {MediaType} = require("./MediaType");
module.exports = (sequelize, DataTypes) => {
    const Media = sequelize.define('Media', {
        url: DataTypes.STRING,
        description: DataTypes.STRING,
        mediaType: MediaType,
        createdAt: DataTypes.DATE,
    },

        {
            tableName: 'scout',
            timestamps: true,
            updatedAt: 'updatedAt',

        });

}