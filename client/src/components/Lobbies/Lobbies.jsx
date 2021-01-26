import React, { Component } from "react";
import { Button, Icon, Modal, Table } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import Lobby from "../Lobby/Lobby";

export default class Lobbies extends Component {
  render() {
    const { lobbies } = this.props;
    console.log(lobbies);
    if (lobbies.length === 0) {
      return <div>Create Lobby</div>;
    } else {
      return (
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Maximum Players</Table.HeaderCell>
              <Table.HeaderCell>Entry Fee</Table.HeaderCell>
              <Table.HeaderCell>House Share</Table.HeaderCell>
              <Table.HeaderCell>Lobby Status</Table.HeaderCell>
              <Table.HeaderCell>Winner</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {lobbies.map((lobby, index) => {
              let players = JSON.parse(lobby.players);
              let winner = "";
              if (
                lobby.players &&
                players.length > 0 &&
                lobby.lobby_status === "completed"
              ) {
                winner = players.filter((p) => p.winner > 0)[0].name;
              }
              return (
                <Table.Row key={index}>
                  <Table.Cell>{lobby.id}</Table.Cell>
                  <Table.Cell>{lobby.max_players}</Table.Cell>
                  <Table.Cell>{lobby.entry_fee}</Table.Cell>
                  <Table.Cell>
                    {lobby.lobby_status === "completed"
                      ? lobby.entry_fee * lobby.max_players * 0.05
                      : ""}
                  </Table.Cell>
                  <Table.Cell>{lobby.lobby_status}</Table.Cell>
                  <Table.Cell>{winner}</Table.Cell>
                  <Table.Cell>
                    <Lobby
                      lobby={lobby}
                      getWinner={lobby.lobby_status === "completed" ? 0 : 1}
                    />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      );
    }
  }
}
