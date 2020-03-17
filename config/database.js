module.exports = {
    dialect: 'potsgres',
    host: process.env.POSTGRESDB_URL,
    username: process.env.POSTGRESDB_USERNAME,
    password: process.env.POSTGRESDB_PASSWORD,
    database: 'chateio',
    define: {
        timestamps: true,
        underscored: true
    }
}; 