import React, { Component } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import api from "../../util/api";

export default class CreateLobby extends Component {
  state = { open: false, max_players: 5, entry_fee: 100 };

  createLobby() {
    this.setState({ open: false });
    api.post("/lobbies/add", {
      max_players: this.state.max_players,
      entry_fee: this.state.entry_fee,
    });

    this.props.onCreate();
    window.location = "/";
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { onCreate } = this.props;
    return (
      <Modal
        centered={false}
        open={this.state.open}
        onOpen={() => this.setState({ open: true })}
        trigger={<Button color="teal">Create Lobby</Button>}
        size="tiny"
      >
        <Modal.Header>Create Lobby</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              label="Maximum Players"
              type="number"
              name="max_players"
              onChange={this.handleChange.bind(this)}
              defaultValue={this.state.max_players}
            />
            <Form.Input
              label="Entry Fee"
              type="number"
              name="entry_fee"
              onChange={this.handleChange.bind(this)}
              defaultValue={this.state.entry_fee}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => this.setState({ open: false })}>Cancel</Button>
          <Button color="green" onClick={this.createLobby.bind(this)}>
            Create
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
