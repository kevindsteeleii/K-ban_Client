import React, { Component } from 'react';
import '../_css/components.scss';

export default class Task extends Component {
  state = {
    // taskList: this.props.task.taskList || [],
    board: this.props.board,
    task: this.props.task
  };

  // returns an array of subtasks as JSX to render
  /* getTaskList = () => {
    const { taskList } = this.state;
    return taskList.map(item => <li>{item}</li>)
  } */

  // adds subtasks after initial setup
 /*  addSubTask = (contents) => {
    const { taskList } = this.state;
    taskList.push(contents);
    this.setState({ taskList });
  } */

  transferTask = evt => {
    const { transferTask, task, prevBoard, nextBoard } = this.props;
    const { board } = this.state;
    // let myBoard = document.querySelectorAll()
    // ternary to determine which direction to go to
    let newBoard = evt.currentTarget.classList[0] === 'right-icon' ? nextBoard : prevBoard;
    this.setState({ board: nextBoard })
    transferTask(task, newBoard, board);
    evt.preventDefault();
  }

  render() {
    const { task, visible } = this.state;
    const { prevBoard, nextBoard } = this.props;
    return (
      <div className="task-body">
      {!!prevBoard && <div className="left-icon"onClick={this.transferTask}><i  className="fas fa-chevron-left"/></div>}
      <p className="task-contents">{task.task}</p>
      {!!nextBoard && <div className="right-icon"onClick={this.transferTask}><i  className="fas fa-chevron-right"/></div>}
      <ul>
        {/* {this.getTaskList()} */}
      </ul>
      </div>
    )
  }
}

