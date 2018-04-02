exports.up = function(knex, Promise) {

    return knex.schema.createTable('messages', (t) => {
        t.integer('sender_id').references('id').inTable('users').notNull().onDelete('Cascade');    
        t.integer('recipient_id').references('id').inTable('users').notNull().onDelete('Cascade');
        t.integer('image_id').references('id').inTable('images').notNull();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('messages');
};
