import Task from '../components/task';
import React, { Component } from 'react';
import Helper from '../helper';
import '../_css/components.scss';

export default class Board extends Component {

  state = {
    name: this.props.board.name
  }

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

  handleNameChange = evt =>  {
    this.setState({ [evt.target.name]: evt.target.value })
    evt.preventDefault();
  }

  // method that handles the name change in the parent state when off focus of the input element
  handleOnBlur = evt => {
    const { name } = this.state;
    const { id, changeName } = this.props;
    changeName(name,id);
    evt.preventDefault();
  }

  render() {
    // const { name } = this.props.board;
    const { name } = this.state;
    return (
      <section className="board" data-name={name}>
        <header className="board-header">
          <form className="board-name">
            <input onBlur={this.handleOnBlur} onChange={this.handleNameChange} value={name} type="text" name="name"/>
          </form>
          {/* <p>{name}</p> */}
          <div onClick={this.handleAddTask} className="icon"><i className="fas fa-plus"/></div>
        </header>
        <div className="board-body">
          {this.getTasks()}
        </div>
      </section>
    )
  }
}


