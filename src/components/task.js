import React, { Component } from 'react';
import '../_css/components.scss';

export default class Task extends Component {
  state = {
    board: this.props.board,
    task: this.props.task.task
  };

  transferTask = evt => {
    const { transferTask, task, prevBoard, nextBoard } = this.props;
    const { board } = this.state;
    // ternary to determine which direction to go to
    let newBoard = evt.currentTarget.classList[0] === 'right-icon' ? nextBoard : prevBoard;
    this.setState({ board: nextBoard })
    transferTask(task, newBoard, board);
    evt.preventDefault();
  }

  render() {
    const { task } = this.state;
    const { prevBoard, nextBoard } = this.props;
    return (
      <div className="task-body">
      {!!prevBoard && <div className="left-icon"onClick={this.transferTask}><i  className="fas fa-chevron-left"/></div>}
      <i className="fas fa-info-circle"></i>
      <p className="task-contents">{task}</p>
      {!!nextBoard && <div className="right-icon"onClick={this.transferTask}><i  className="fas fa-chevron-right"/></div>}
      <ul>
        {/* {this.getTaskList()} */}
      </ul>
      </div>
    )
  }
}

