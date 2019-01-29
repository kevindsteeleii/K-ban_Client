import React, { Component } from 'react';
import '../_css/components.scss';

export default class Task extends Component {
  state = {
    taskList: this.props.taskList || [],
    board: this.props.board,
    task: this.props.task
  };

  // returns an array of subtasks as JSX to render
  getTaskList = () => {
    const { taskList } = this.state;
    return taskList.map(item => <li>{item}</li>)
  }

  // adds subtasks after initial setup
  addSubTask = (contents) => {
    const { taskList } = this.state;
    taskList.push(contents);
    this.setState({ taskList });
  }

  render() {
    const { task } = this.state;
    const { transferTask } = this.props;
    return (
      <div className="task-body">
        <p className="task-contents">{task}</p>
        <div className="right-icon" onClick={evt => {transferTask(evt, this.props)}}><i  className="fas fa-chevron-right"/></div>
        <ul>
          {this.getTaskList()}
        </ul>
      </div>
    )
  }
}

