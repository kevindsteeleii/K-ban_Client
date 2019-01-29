import Task from '../components/task';
import React, { Component } from 'react';
import '../_css/components.scss';

export default class Board extends Component {

  state = {
    name: this.props.board.name || "",
    limited: this.props.board.limit? true : false,
    limit: this.props.board.limit || null,
    tasks: []
  } 

  // returns task JSX objects to render
  getTasks = () => {
    const { tasks, name } = this.state;
    return tasks.map(task => 
    <Task key={`${name}-${task}`} task={task} board={name} transferTask={this.transferTask} taskList={task.taskList}/>)
  }

  // adds task, no conditions
  addTask = (task) => {
    const { tasks, limit } = this.state;
    // check if there is a limit or is past its limit
    if (limit === null || limit > tasks.length){
    // add a dummy task
    tasks.push(task);
    // set tasks in state to tasks that just updated
    this.setState({ tasks });
    } else {
      alert('Limit reached. Delete or edit your task.')
    }
  }

  // transfers task between boards  
  transferTask = (evt, { task, board, taskList }) => {
    debugger;
    alert('it works');
    evt.preventDefault();
  }

  handleAddTask = evt => {
    // clone tasks
    let task = prompt('Enter a new task:');
    this.addTask(task);
    // update the DOM
    evt.preventDefault();
  }

  render() {
    const { name } = this.state;
    return (
      <section className="board">
        <header className="board-header">
          <p>{name}</p>
          <div onClick={this.handleAddTask} className="icon"><i className="fas fa-plus"/></div>
        </header>
        <div className="board-body">
          {this.getTasks()}
        </div>
      </section>
    )
  }
}


