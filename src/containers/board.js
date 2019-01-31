import Task from '../components/task';
import React, { Component } from 'react';
import Helper from '../helper';
import '../_css/components.scss';

export default class Board extends Component {

  // returns task JSX objects to render
  getTasks = () => {
    const { id } = this.props.board;
    const { tasks, transferTask, prevBoard, nextBoard } = this.props;
    if (tasks) {
      return tasks.map(task => 
      <Task key={Helper.randomId()} 
      task={task} boardId={id} 
      transferTask={transferTask}
      prevBoard={prevBoard}
      nextBoard={nextBoard}
      />)
    }
    
  }

  // add tasks
  addTask = (task) => {
    const { tasks, addTask, board } = this.props;
    const {limit, id } = board;
    // check if there is a limit or is past its limit
    if (typeof limit === 'undefined' || limit > tasks.length){
    // add a task
      addTask(task, id);
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
    const { name } = this.props.board;
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


