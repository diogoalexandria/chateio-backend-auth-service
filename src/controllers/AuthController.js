const User = require('../models/User');
module.exports = {    
    async registerUser(req, res) {        
        const { nickname, email, password } = req.body;
        try {
            let data = {                
                nickname,
                email,
                password
            };
            if (nickname && email && password) {
                const user = await User.create(data);                
                console.log("Users: ", users);
                res.status(201).json({
                    message: "Usuário criado com sucesso"
                });                
            } else {
                res.status(401).json({
                    message: "Dados incompletos"
                });
            }            
        } catch (err) {
            console.log(err);
            res.json({
                message: "Algo deu errado"
            });
        }
    },
    signInUser(req, res) {
        console.log(req.body);
        res.status(200);
        res.json({
            message: 'Usuário Autorizado'
        });
    }
}
