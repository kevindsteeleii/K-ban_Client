import Task from '../components/task';
import React, { Component } from 'react';
import Helper from '../helper';
import '../_css/components.scss';

export default class Board extends Component {

  state = {
    name: this.props.board.name || "",
    limited: this.props.board.limit? true : false,
    limit: this.props.board.limit || null
  } 

  // returns task JSX objects to render
  getTasks = () => {
    const { name } = this.state;
    const { tasks, transferTask, prevBoard, nextBoard } = this.props;
    return tasks.map(task => 
      <Task key={Helper.randomId()} 
      task={task} board={name} 
      transferTask={transferTask}
      prevBoard={prevBoard}
      nextBoard={nextBoard}
      />)
  }

  // adds task, no conditions
  addTask = (task) => {
    const { limit, name } = this.state;
    const { tasks, addTask } = this.props;
    // check if there is a limit or is past its limit
    if (limit === null || limit > tasks.length){
    // add a task
      addTask(task, name);
    } else {
      alert('Limit reached. Delete or edit your task.')
    }
  }

  handleAddTask = evt => {
    // prompts for input for simple task
    let task = prompt('Enter a new task:');
    this.addTask(task);
    evt.preventDefault();
  }

  render() {
    const { name } = this.state;
    return (
      <section className="board" data-name={name}>
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


