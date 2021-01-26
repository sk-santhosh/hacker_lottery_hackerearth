import React, { Component } from "react";
import { Button, Container, Form, Header } from "semantic-ui-react";
import Lobbies from "../../components/Lobbies/Lobbies";
import CreateLobby from "../../components/CreateLobby/CreateLobby";
import api from "../../util/api";

export default class Dashboard extends Component {
  state = { lobbies: [], total_house_share: 0 };

  componentDidMount() {
    this.updateLobbies();
  }

  async updateLobbies() {
    await api.get("/lobbies", null, (err, lobbies) => {
      if (!err) {
        this.setState({
          lobbies: lobbies.data.lobbies,
          total_house_share: lobbies.data.total_house_share,
        });
      }
    });
  }

  render() {
    const { lobbies } = this.state;
    return (
      <Container>
        <br />
        <br />
        <div>
          <Header as="h1">Dashboard</Header>
          <Header as="h3">Total Share : {this.state.total_house_share}</Header>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div>
          <Header as="h1">Lobbies</Header>
          <CreateLobby onCreate={this.updateLobbies.bind(this)} />
        </div>

        <Lobbies lobbies={lobbies} />
      </Container>
    );
  }
}
