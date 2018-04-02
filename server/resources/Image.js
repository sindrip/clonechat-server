const knex = require('./../db/knex');
const _ = require('lodash');

module.exports.create = async (uuid, owner_id) => {
    if (!uuid) {
        return null;
    }

    const result = await knex('images')
        .returning(['id', 'uuid'])
        .insert({
            uuid,
            owner_id,
        })

    return result[0];    
};

module.exports.findById = async (id) => {
    if (!id) {
        return null;
    }

    const result = await knex('images')
    .select(['uuid'])
    .where({
        id,
    });

    if (result.length === 0) {
        return null;
    }

    return result[0];
};

module.exports.userHasAccess = async (user_id, image_id) => {

    const result = await knex('messages')
    .select('*')
    .where({
        recipient_id: user_id,
        image_id,
    })

    console.log(result.length);

    if (!result || result.length === 0) {
        return false;
    }

    return true;
};
