
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('messages', (t) => {
        t.timestamp('created_at').defaultTo(knex.fn.now());    
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('messages', (t) => {
        t.dropTimestamps();
    })
};
