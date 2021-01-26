import React, { Component } from "react";
import { Button, Form, Modal, Table } from "semantic-ui-react";
import api from "../../util/api";

export default class Lobby extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.lobby.id;
    this.state = {
      open: false,
      players: JSON.parse(this.props.lobby.players) || [],
      newPlayer: "",
    };

    this.addPlayer = this.addPlayer.bind(this);
  }

  async addPlayer() {
    console.log("this");
    await this.setState({
      players: [...this.state.players, { name: this.state.newPlayer }],
      newPlayer: "",
    });
    api.post(`/lobbies/add/${this.id}`, { players: this.state.players });
  }

  selectWinners() {
    api.get(`/lobbies/winner/${this.id}`, { players: this.state.players });
    window.location = "/";
  }

  componentDidUpdate(preProps) {}

  render() {
    const { lobby } = this.props;

    return (
      <Modal
        centered={false}
        open={this.state.open}
        onOpen={() => this.setState({ open: true })}
        trigger={<Button icon="users" color="blue" compact />}
        size="tiny"
      >
        <Modal.Header>#{lobby.id} - Players</Modal.Header>
        <Modal.Content>
          <Table basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Player</Table.HeaderCell>
                <Table.HeaderCell>Winner</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.players.map((player, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{player.name}</Table.Cell>
                  <Table.Cell>{player.winner}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {this.state.players.length < lobby.max_players ? (
            <Form onSubmit={this.addPlayer}>
              <Form.Input
                label="Name"
                value={this.state.newPlayer}
                onChange={(e) => this.setState({ newPlayer: e.target.value })}
              />
              <Button submit compact color="teal">
                Add Player
              </Button>
            </Form>
          ) : this.props.getWinner ? (
            <Button color="green" onClick={() => this.selectWinners()}>
              Get Winner
            </Button>
          ) : (
            ""
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => this.setState({ open: false })}>Close</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
