const { authSecret } = require('../.env');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const { Strategy, ExtractJwt } = passportJwt;

module.exports = (app) => {
    const params = {
        secretOrKey = authSecret,
        jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    };

    const strategy = new Strategy(params, (payLoad, done) => {
        app.db('users').where({ id: payLoad.id }).first()
            .then(user => {
                if (user)
                    done(null, { id: user.id, address: user.address });
                else
                    done(null, false);
            })
            .cath(erro => done(erro, false));
    });

    passport.use(strategy);

    return {
        initialize: () => passport.initialize(),
        autenticate: () => passport.authenticate('jwt', { session: false })
    };
}
