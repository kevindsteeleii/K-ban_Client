import React, { Component } from 'react';
import Board from './board';
import Helper from '../helper';
import '../_css/components.scss'

export default class Container extends Component {
  state = {
    boards: [
      {
        name: "Staging",
        id: Helper.randomId()
      },
      {
        name: "WIP",
        id: Helper.randomId()
      },
      {
        name: "Review",
        id: Helper.randomId()
      },
      {
        name: "Done",
        id: Helper.randomId(),
        limit: 3
      }
    ],
    tasks: [],
    taskList: [],
    boardOrder: [],
    taskCount: 0
  };

  componentDidMount() {
    const { boardOrder, boards } = this.state;
    for (let brd of boards) {
      if (boardOrder.indexOf(brd.name) === -1){
        boardOrder.push(brd.name);
      }
    }
    this.setState({ boardOrder });
  }

  addNewTask = (task, boardId) => {
    // clone tasks from state
    let { tasks, taskCount } = this.state;

    // make a new Task object
    const newTask = {
      id: taskCount + 1,
      task,
      boardId
    }
      // push to copied tasks
      tasks.push(newTask);

      this.setState({ tasks }, () => {
        this.setState({taskCount: ++taskCount})
      });
  }

  // *TODO: write changeTaskName

  changeBoardName = (newName, id) => {
    // _NOTE: replace this w/ server-bound logic when server made or better yet have redux deal w/ it
    const { boards } = this.state;
    const changeBoards = boards.map(brd => {
      if (brd.id === id) {
        brd.name = newName
      }
      return brd
    })
    this.setState({ boards: changeBoards });
  }

  // filters the array of tasks by boardId
  filterTasks = (boardId) => {
    const { tasks } = this.state;
    return tasks.filter(task => task.boardId === boardId)
  }

  transferTask = (task, boardId ) => {
    // clone tasks, boards, and boardOrder
    let { boards, tasks, boardsOrder } = this.state;

    // init variable for board
    let transferBoard = null;
    for (let brd of boards){
      if (brd.id === boardId){
        transferBoard = brd
      }
    }

    let tasksAmount = this.filterTasks(transferBoard.id).length;
    // encapsulate in a conditional
    if (typeof transferBoard.limit === 'undefined' || transferBoard.limit > tasksAmount) {
      tasks[task.id - 1].boardId = transferBoard.id;
      this.setState({ tasks });
    } else {
      alert('Filled to capacity!')
    }
  }

  getBoards = () => {
    const { boards, boardOrder } = this.state;

    // make a hash that is used to store the pre-filtered tasks
    const taskByBoard = {};
    // if 
    for (let brd of boardOrder){
      // get index of boardName
      let idx = boardOrder.indexOf(brd);
      let boardId = boards[idx].id;
      // use index to get the id
      taskByBoard[boardId] = this.filterTasks(boardId);
    }
    // map the array of objects to an array of JSX objects
    const boardsJSX = boards.map((board, idx) => {
      // depending on the order in boardIds the item may or may not have a next/previous board
      let prevBoard = idx === 0 ? null : /* boardIds */boards[idx - 1].id;
      let nextBoard = idx === boards.length - 1 ? null : /* boardIds */boards[idx + 1].id;
      // return each indv'l Board JSX object 
      return (<Board 
        key={boards[idx].id} 
        id={boards[idx].id} 
        tasks={taskByBoard[`${board.id}`]} 
        addTask={this.addNewTask} 
        prevBoard={prevBoard} 
        nextBoard={nextBoard} board={board}
        transferTask={this.transferTask}
        changeName={this.changeBoardName}
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

