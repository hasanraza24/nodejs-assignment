var User = require('../models/user.model');
var jwt = require('jsonwebtoken');
const config = require('../config/config');
var _ = require('lodash');
var bcrypt = require('bcrypt');

const register = async (req, res, next) => {
    try {
        const userObj = await User.create(req.body);
        const user = _.pick(userObj, ['email', '_id']);
        const tokenData = {
            email: user.email,
            _id: user._id
        };
        const token = await jwt.sign(tokenData, config.jwtSecret);
        res.json({ data: { user, token }, message: 'User Created'});
    }catch(e) {
        next(e);
    }
};

const login = async (req, res, next) => {
    try {
        const userObj = await User.login(req.body);
        const user = _.pick(userObj, ['email', '_id']);
        const tokenData = {
            email: user.email,
            _id: user._id
        };
        const token = await jwt.sign(tokenData, config.jwtSecret);
        res.json({ data: { user, token }, message: 'User Logged in!'});
    }catch(e) {
        next(e);
    }
}

const createMultipleUsers = async () => {
    let arr = []
    const salt = await bcrypt.genSalt(10);
    for (let i = 1; i <= 100; i++ ) {
        let userObj = {
            name: 'user' + i,
            email: `user${i}@gmail.com`,
            address: `add ${i}, some city`,
            password: await bcrypt.hash('qwerty', salt)
        }
        arr.push(userObj)
    }
    User.insertMany(arr).then(doc => {
        console.log('doc', doc)
    }).catch(err => {
        console.log('err',err)
    })
}

module.exports = {
    login,
    register
}