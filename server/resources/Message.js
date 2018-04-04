const knex = require('./../db/knex');
const _ = require('lodash');

module.exports.create = async (sender, recipient, uuid) => {
    if (!sender || !recipient || !uuid) {
        return null;
    }

    const exists = await knex('images')
    .select('*')
    .where({
        uuid,
        owner_id: sender,
    });

    if (exists.length === 0) {
        return null;
    }

    const result = await knex('messages')
        .returning('*')
        .insert({
            sender_id: sender,
            recipient_id: recipient,
            image_id: exists[0].id,
        })

    return result[0];    
};

module.exports.getMessagesByUserId = async (id) => {
    if (!id) {
        return null;
    }

    const result = await knex('messages')
        .select(['image_id', 'username', 'created_at'])
        .join('users', 'users.id', '=', 'messages.sender_id')
        .where({
            recipient_id: id,
        })

    if (!result) {
        return null;
    }

    console.log(result);

    return result;
}

module.exports.deleteMessageById = async (recipient_id, image_id) => {
    if (!image_id || !recipient_id) {
        return null;
    }

    const result = await knex('messages')
        .where({
            image_id,
            recipient_id,
        })
        .del();

    if (!result) {
        console.log(result)
        return null;
    }

    return result;
};


