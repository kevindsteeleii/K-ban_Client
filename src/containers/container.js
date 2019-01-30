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
    boardOrder: [],
    taskCount: 0
  };

  addNewTask = (task, boardName) => {
    // clone tasks from state
    let { tasks, taskCount } = this.state;
    // assign tasks obj to the specific board name as key
    let boardNameHash = tasks[boardName];
    // make a new Task object
    const newTask = {
      id: taskCount + 1,
      task,
      idx: boardNameHash.length
    }
      // push to copied tasks
      boardNameHash.push(newTask);
      // set updated tasks array to state
      tasks = {...tasks, [boardName]: boardNameHash};
      this.setState({ tasks }, () => {
        this.setState({taskCount: ++taskCount});
      });
  }
  

  transferTask = (task, transferBoard, oldBoard) => {
    // clone tasks, boards, and boardOrder
    let { tasks, boards, boardOrder } = this.state;
    // deep copy of passed arg task
    let copy = {...task};
    // use the idx of boardsOrder to grab the board to be transferred to
    let newBoard = boards[boardOrder.indexOf(transferBoard)]

    // encapsulate in a conditional
    if (typeof newBoard.limit === 'undefined' || newBoard.limit > tasks[transferBoard].length) {
      // remove the offending task
      tasks[oldBoard].splice(copy.idx, 1);
      // change idx to index of length of board tasks
      copy.idx = tasks[transferBoard].length;
      // push clone to new board
      tasks[transferBoard].push(copy);
      this.setState({ tasks });
    } else {
      alert('Filled to capacity!')
    }
  }

  getBoards = () => {
    const { boards, tasks, boardOrder } = this.state;
/*     // init board names array
    const boardNames = []; */
    // populate with boards in order of appearance
    for (let brd of boards){
      /* boardNames */
      if (boardOrder.indexOf(brd.name) === -1) {
        boardOrder.push(brd.name);
      }
    }

    // map the array of objects to an array of JSX objects
    const boardsJSX = boards.map((board, idx) => {
      // depending on the order in boardNames the item may or may not have a next/previous board
      let prevBoard = idx === 0 ? null : /* boardNames */boardOrder[idx - 1];
      let nextBoard = idx === boards.length - 1 ? null : /* boardNames */boardOrder[idx + 1];
      // return each indv'l Board JSX object 
      return (<Board 
        key={Helper.randomId()} 
        tasks={tasks[`${board.name}`]} 
        addTask={this.addNewTask} 
        prevBoard={prevBoard} 
        nextBoard={nextBoard} board={board}
        transferTask={this.transferTask}
        />)
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

