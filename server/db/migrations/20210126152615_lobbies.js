exports.up = (knex) =>
  knex.schema.createTable("lobbies", (table) => {
    table.increments();

    table.integer("max_players").notNullable();
    table.integer("entry_fee").notNullable();
    table.json("players");
    table.enu("lobby_status", ["waiting", "ready", "started", "completed"]);
  });

exports.down = (knex) => knex.schema.dropTable("lobbies");
