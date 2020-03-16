module.exports = {
    users: [],
    registerUser(req, res) {        
        console.log("Body: ", req.body);
        try {
            let data = {
                id: Date.now().toString(),
                nickname: req.body.nickname,
                email: req.body.email,
                password: req.body.password
            }
            if (data.nickname) {
                users.push(data);
                console.log("Users: ", users);
            }
            res.send('ok!');
        } catch (err) {
            console.log(err);
            res.json({
                message: "Algo seu errado"
            });
        }
    },
    signInUser(req, res) {
        console.log(req.body);
        res.status(200);
        res.json({
            message: 'Autorizado'
        });
    }
}
