
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (t) => {
        t.increments().primary();
        t.string('username').notNull().unique();
        t.string('password').notNull();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
