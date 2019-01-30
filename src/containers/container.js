import React, { Component } from 'react';
import Board from './board';
import Helper from '../helper';
import '../_css/components.scss'

export default class Container extends Component {
  state = {
    boards: [
      {
        name: "Staging"
      },
      {
        name: "WIP"
      },
      {
        name: "Review"
      },
      {
        name: "Done",
        limit: 3
      }
    ],
    tasks: {
      Staging: [],
      WIP: [],
      Review: [],
      Done: []
    },
    taskList: [],
    taskCount: 0
  };

  addNewTask = (/* evt, */ task, boardName) => {
    // clone tasks from state
    let { tasks, taskCount } = this.state;
    // assign tasks obj to the specific board name as key
    let boardNameHash = tasks[boardName];
    // make a new Task object
    const newTask = {
      id: taskCount + 1,
      task
    }
    // push to copied tasks
    boardNameHash.push(newTask);
    // set updated tasks array to state
    tasks = {...tasks, [boardName]: boardNameHash};
    this.setState({ tasks }, () => {
      this.setState({taskCount: ++taskCount});
    });
  }

  transferTask = (/* evt, */ id, transferBoard) => {
    // clone tasks
    const { tasks } = this.state;
    // find
    tasks[id].board = transferBoard;
    this.setState({ tasks });
  }

  getBoards = () => {
    const { boards, tasks } = this.state;
    // init board names array
    const boardNames = [];
    // populate with boards in order of appearance
    for (let brd of boards){
      boardNames.push(brd.name);
    }

    // map the array of objects to an array of JSX objects
    const boardsJSX = boards.map((board, idx) => {
      // depending on the order in boardNames the item may or may not have a next/previous board
      let prevBoard = idx === 0 ? null : boardNames[idx - 1];
      let nextBoard = idx === boards.length - 1 ? null : boardNames[idx + 1];
      // return each indv'l Board JSX object 
      return <Board key={Helper.randomId()} tasks={tasks[`${board.name}`]} addTask={this.addNewTask} prevBoard={prevBoard} nextBoard={nextBoard} board={board}/>
    })
    

    // return boardsJSX
    return boardsJSX;
  }

  

  render() {
    return (
      <div id="main-container">
        {this.getBoards()}
      </div>
    )
  }
}

