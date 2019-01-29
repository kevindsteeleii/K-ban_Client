import React, { Component } from 'react';
import Board from './board';
import '../_css/components.scss'

export default class Container extends Component {
  state = {
    boards: [
      {
        name: "Staging",
      },
      {
        name: "WIP",
      },
      {
        name: "Review",
      },
      {
        name: "Done",
        limit: 3
      }
    ]
  };

  getBoards = () => {
    const { boards } = this.state
    return boards.map(board => <Board key={board} board={board}/>)
  }

  render() {
    return (
      <div id="main-container">
        {this.getBoards()}
      </div>
    )
  }
}

