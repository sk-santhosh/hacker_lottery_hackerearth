const config = require("./knexfile");

const knex = require("knex")(config);

(async () => {
  try {
    const isExists = await knex.schema.hasTable(config.migrations.tableName);

    if (!isExists) {
      await knex.migrate.latest();
      await knex.seed.run();
    }
  } catch (error) {
    process.exitCode = 1;

    throw error;
  } finally {
    knex.destroy();
  }
})();

exports.knex = knex;
