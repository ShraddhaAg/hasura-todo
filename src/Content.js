import React, { Component } from 'react';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import CompletedTodos from './components/CompletedTodos';
import './App.css';


class Content extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      isAuthenticated() && (
        <div className="App container">
          <div className="col-md-2"></div>
          <div className="col-md-8">
          <div class="list-group list-group-flush">
            <AddTodo />
            <Todos />
            <CompletedTodos />
          </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      )
    );
  }
}

export default Content;
