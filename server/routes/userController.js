const _ = require('lodash');
const User = require('./../resources/User');

module.exports.addFriend = async (req, res) => {
    const body = _.pick(req.body, [
        'username',
    ]);
    const omittedBody = _.omitBy(body, _.isNil);
    if (Object.keys(omittedBody).length !== 1) {
        return res.sendStatus(400);
    }

    const username_exists = await User.findByUsername(omittedBody.username)
    if (!username_exists) {
        return res.sendStatus(400);
    }

    const result = await User.addFriendToUserId(req.session.user_id, username_exists.id);
    if (!result) {
        return res.sendStatus(400);
    }

    return res.status(201).send(result);
};

module.exports.getFriends = async (req, res) => {
    const result = await User.getFriendsByUserId(req.session.user_id);
    if (!result) {
        return res.sendStatus(400);
    }

    return res.status(200).send({userlist: result});
};

module.exports.deleteFriend = async (req, res) => {
    const body = _.pick(req.body, [
        'username',
    ]);
    const omittedBody = _.omitBy(body, _.isNil);
    if (Object.keys(omittedBody).length !== 1) {
        return res.sendStatus(400);
    }

    const username_exists = await User.findByUsername(omittedBody.username)
    if (!username_exists) {
        return res.sendStatus(400);
    }

    const result = await User.deleteFriendByUserId(req.session.user_id, username_exists.id);
    if (!result) {
        return res.sendStatus(400);
    }

    return res.sendStatus(200);
};

module.exports.searchForUsername = async (req, res) => {
    if (!req.query.username) {
        return res.sendStatus(400);
    }

    const result = await User.searchForUsername(req.session.user_id, req.query.username);
    if (!result) {
        return res.sendStatus(400);
    }

    return res.status(200).send({userlist: result});
};