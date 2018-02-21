const knex = require('./../db/knex');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

module.exports.create = async (user) => {
    if (!user.username || !user.password) {
        return null;
    }

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(user.password, salt)

    const result = await knex('users')
        .returning(['id', 'username'])
        .insert({
            username: user.username,
            password: hash,
        })

    return result[0];    
};

module.exports.findByUsername = async (username) => {
    if (!username) {
        return null;
    }

    const result = await knex('users')
    .select(['id', 'username'])
    .where({
        username,
    });

    if (result.length === 0) {
        return null;
    }

    return result[0];
};

module.exports.findPasswordByUsername = async (username) => {
    if (!username) {
        return null;
    }

    const result = await knex('users')
        .select('password')
        .where({
            username,
        });

    if (result.length === 0) {
        return null;
    }

    return result[0].password;
};

module.exports.addFriendToUserId = async (user_id, friend_id) => {
    if (!user_id || !friend_id) {
        return null;
    }

    if (user_id === friend_id) {
        return null;
    }

    const exists = await knex('users_friends')
        .select('*')
        .where({
            user_id,
            friend_id,
        });

    if (exists.length !== 0) {
        return null;
    }

    const result = await knex('users_friends')
        .returning('*')
        .insert({
            user_id,
            friend_id,
        });

    if (!result) {
        return null;
    }

    return result[0];
}

module.exports.getFriendsByUserId = async (user_id) => {
    if (!user_id) {
        return null;
    };

    const result = await knex('users_friends')
        .returning('friend_id')
        .where({
            user_id,
        });
    
    return result;
};