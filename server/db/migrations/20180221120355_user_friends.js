exports.up = function(knex, Promise) {

    return knex.schema.createTable('users_friends', (t) => {
        t.integer('user_id').references('id').inTable('users').notNull().onDelete('Cascade');    
        t.integer('friend_id').references('id').inTable('users').notNull().onDelete('Cascade');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users_friends');
};
