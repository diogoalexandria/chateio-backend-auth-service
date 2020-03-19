const Token = require('../models/Token');

async function createRefreshToken(data) {
    const token = await Token.create(data);
    return token;
}

async function findRefreshToken(token) {
    const token = await Token.findOne({
        where: {
            token
        }
    });
    return token;
}

function deleteRefreshToken(req, res) {
    refresh_token = req.body.token
    Token.destroy({
        where: {
            refresh_token
        }
    }).then(deletedToken => {        
        res.status(200).json({
            message: `${deletedToken} foi excluído`
        })
    }).catch(err => {
        res.json({
            message: err
        })
    });  
}

module.exports = {
    createRefreshToken,
    findRefreshToken,
    deleteRefreshToken
}