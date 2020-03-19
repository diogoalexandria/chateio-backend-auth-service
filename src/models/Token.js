const { Model, DataTypes } = require('sequelize');

class Token extends Model {
    static init(sequelize) {
        super.init({
            access_token: DataTypes.STRING,
            refresh_token: DataTypes.STRING
        });
    };

    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user_acess'
        })
    }
};

module.exports = Token;