const { authSecret } = require('../.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

module.exports = (app) => {
    const signin = async (req, res) => {
        if (!req.body.address || !req.body.password)
            return res.status(400).send('dados incompletos');
        
        const user = await app.db('users').whereRaw('LOWER(address) = LOWER(?)', req.body.address).first();

        if (user) {
            bcrypt.compare(req.body.password, user.password, (erro, isMath) => {
                if (erro || !isMath)
                    return res.status(401).send();
                
                const payLoad = { id: user.id };

                res.json({
                    name: user.name,
                    address: user.address,
                    token: jwt.encode(payLoad, authSecret)
                });
            });
        } else {
            res.status(400).send('usuario nao encontrado');
        }
    }

    return { signin };
}