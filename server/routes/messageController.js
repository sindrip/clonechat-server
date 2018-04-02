const _ = require('lodash');
const Message = require('./../resources/Message');
const User = require('./../resources/User');


module.exports.sendMessage = async (req, res) => {
    const body = _.pick(req.body, [
        'recipient',
        'uuid',
    ]);
    const omittedBody = _.omitBy(body, _.isNil);
    if (Object.keys(omittedBody).length !== 2) {
        return res.sendStatus(400);
    }

    const username_exists = await User.findByUsername(omittedBody.recipient)
    if (!username_exists) {
        return res.sendStatus(400);
    }

    const result = await Message.create(req.session.user_id, username_exists.id, omittedBody.uuid);
    if (!result) {
        return res.sendStatus(400);
    }

    return res.status(201).send(result);
};

module.exports.getMyMessages = async (req, res) => {
    const result = await Message.getMessagesByUserId(req.session.user_id);

    if (!result) {
        return res.status(400).send();
    }

    return res.status(200).send(result);
};

module.exports.deleteMessage = async (req, res) => {
    const body = _.pick(req.body, [
        'imageid',
    ]);

    const omittedBody = _.omitBy(body, _.isNil);
    if (Object.keys(omittedBody).length !== 1) {
        return res.sendStatus(400);
    }

    const result = await Message.deleteMessageById(req.session.user_id, omittedBody.imageid)

    if (!result) {
        return res.status(400).send();
    }

    return res.status(200).send();
}
