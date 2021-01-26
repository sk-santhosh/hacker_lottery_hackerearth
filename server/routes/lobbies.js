var express = require("express");
var knex = require("../db/connection");
var router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  let total_house_share = 0;
  var lobbies = await knex.from("lobbies");
  lobbies.forEach((l) => {
    if (l.lobby_status == "completed") {
      total_house_share += l.max_players * l.entry_fee * 0.05;
    }
  });
  res.json({ total_house_share, lobbies });
});

router.post("/add", async (req, res, next) => {
  console.log(req.body.max_players);
  const _req = req.body;
  if (_req.max_players && _req.entry_fee) {
    await knex("lobbies").insert({
      max_players: _req.max_players,
      entry_fee: _req.entry_fee,
      lobby_status: "waiting",
    });
  }
  var lobbies = await knex.from("lobbies");
  res.json({ lobbies });
});

router.post("/add/:id", async (req, res, next) => {
  await knex("lobbies")
    .where("id", req.params.id)
    .update("players", JSON.stringify(req.body.players));

  res.sendStatus(200);
});

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

router.get("/winner/:id", async (req, res, next) => {
  let lobby = await knex("lobbies").where("id", req.params.id);

  if (lobby[0] && lobby[0].lobby_status == "waiting") {
    let players = JSON.parse(lobby[0].players);
    let winner = random(1, players.length);

    players[winner].winner = lobby[0].entry_fee * players.length * 0.95;
    console.log(players);
    await knex("lobbies")
      .where("id", req.params.id)
      .update("players", JSON.stringify(players))
      .update("lobby_status", "completed");
  }

  res.sendStatus(200);
});

module.exports = router;
