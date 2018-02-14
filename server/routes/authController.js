const bcrypt = require('bcryptjs');
const _ = require('lodash');
const User = require('./../resources/User');

module.exports.register = async (req, res) => {
    const body = _.pick(req.body, [
        'username',
        'password',
    ]);
    const omittedBody = _.omitBy(body, _.isNil);
    if (Object.keys(omittedBody).length !== 2) {
        return res.sendStatus(400);
    }

    const exists = await User.findByUsername(omittedBody.username)
    if (exists) {
        return res.sendStatus(400);
    }

    const result = await User.create(omittedBody);

    if (!result) {
        return res.sendStatus(400);
    }

    return res.status(201).send(result[0]);
};

module.exports.login = async (req, res) => {
    const body = _.pick(req.body, [
        'username',
        'password',
    ]);

    const omittedBody = _.omitBy(body, _.isNil);
    if (Object.keys(omittedBody).length !== 2) {
        return res.sendStatus(400);
    }

    const hashed_password = await User.findPasswordByUsername(omittedBody.username)
    if (!hashed_password) {
        return res.sendStatus(401)
    }

    const authorized = await bcrypt.compare(omittedBody.password, hashed_password);    
    if (!authorized) {
        return res.sendStatus(401);
    }

    const user = await User.findByUsername(omittedBody.username);

    req.session.user_id = user.id;

    return res.sendStatus(200);
};

module.exports.logout = async (req, res) => {

    await req.session.destroy();

    return res.sendStatus(200);
}