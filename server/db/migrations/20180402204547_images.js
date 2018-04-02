exports.up = function(knex, Promise) {

    return knex.schema.createTable('images', (t) => {
        t.increments().primary();
        t.string('uuid').notNull().unique();
        t.integer('owner_id').references('id').inTable('users').notNull();                  
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('images');
};
