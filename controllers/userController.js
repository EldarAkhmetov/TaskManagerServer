const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const {User} = require('../models/models');
const jwt = require('jsonwebtoken');



const generateJwt = (id, login, role) => {
    return jwt.sign(
        {id, login, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    );
}

class UserController {
    async login(req, res, next) {
        const {login, password} = req.body;
        const user = await User.findOne({where: {login}});
        if (!user) {
            return next(ApiError.internal('User not found'));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Incorrect password'));
        }
        const token = generateJwt(user.id, user.login, user.role);
        return res.json({token});
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.login, req.user.role);
        res.json({token})
    }
}

module.exports = new UserController()