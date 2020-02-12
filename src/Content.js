import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import CompletedTodos from './components/CompletedTodos';
import { vars } from './env';
import './App.css';


class Content extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      isAuthenticated() && (
        <div className="App container-fluid">
          <h1 className="title">Your Todos</h1>
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <AddTodo />
            <Todos />
            <CompletedTodos />
          </div>
          <div className="col-md-2"></div>
        </div>
      )
    );
  }
}

export default Content;
