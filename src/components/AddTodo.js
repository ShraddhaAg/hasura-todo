import React, { Component } from 'react';
import { AddTodoQuery } from '../queries/Queries';
import { Mutation } from "react-apollo";
import '../App.css';

class AddTodo extends Component {
  getUser() {
    const sub = localStorage.getItem('sub');
    return sub;
  }

  addnewTodo(addTodo, e) {
    if(e.which === 13) {
      const user_id = this.getUser();
      addTodo({
        variables: { 
            todo_name: e.target.value, 
            user_id: user_id
        }
      })
      .catch(function(error) {
        console.log(error);
      });
      e.target.value = "";
    }
  }
  render () {
    return (
      <Mutation mutation={AddTodoQuery}>
        {
          (addTodo, { data }) => (
            <div class="">
              <input type="text" className="list-group-item inp-todo" placeholder="What's on your mind?" onKeyPress={this.addnewTodo.bind(this, addTodo)} />
            </div>
            )
        }
      </Mutation>
    );
  }
}

export default AddTodo;
