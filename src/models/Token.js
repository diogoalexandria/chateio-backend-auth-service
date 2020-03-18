const { Model, DataTypes } = require('sequelize');

class Token extends Model {
    static init(sequelize) {
        super.init({
            jwt: DataTypes.STRING
        })
    }
}