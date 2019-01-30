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
    const { tasks } = this.props;
    console.log(`Tasks for ${this.state.name}: are \n ${tasks}`);
    return tasks.map(task => 
      <Task key={Helper.randomId()} task={task} board={name} />)
  }

  // adds task, no conditions
  addTask = (task) => {
    const { limit, name } = this.state;
    const { tasks, addTask } = this.props;
    // check if there is a limit or is past its limit
    if (limit === null || limit > tasks.length){
    // add a task
      addTask(task, name);
    // tasks.push(task);
    } else {
      alert('Limit reached. Delete or edit your task.')
    }
  }

  // transfers task between boards  
  transferTask = (evt, { task, board, taskList }) => {
    debugger;
    let evtTask = evt.currentTarget.parentElement;
    const iconType = evt.currentTarget.classList[0];
    if (iconType === 'right-icon') {
    
    } else {

    }
    alert(`${iconType} was pressed`);
    evt.preventDefault();
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


