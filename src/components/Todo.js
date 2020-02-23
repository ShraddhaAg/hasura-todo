import React, { Component } from 'react';
import $ from 'jquery';
import { Mutation } from "react-apollo";
import { MarkCompletedQuery, deleteQuery } from '../queries/Queries';
import '../App.css';

class Todo extends Component {

  completedTask(id, mark, e) {
    $("#" + id + " p").css({ 'text-decoration': 'line-through'});
    mark({
      variables: { id: id }
    })
  }

  deleteTodo(id, del, e) {
    del({
      variables: { id: id }
    })
  }

  render() {
    return (
      <Mutation mutation={MarkCompletedQuery}>
        {
          (mark, { data }) => (
            <div 
            className={this.props.data.completed ? "todos list-group-item todo-list-completed": "todos list-group-item"} 
            onClick={this.completedTask.bind(this, this.props.data.id, mark)} 
            id={this.props.data.id}>
              <Mutation mutation={deleteQuery}>
                {
                  (del, { data1 }) => (
                    <div>
                      <i className="fas fa-times-circle cross" 
                      data-toggle="tooltip" 
                      data-placement="top" 
                      title="Click to delete" 
                      onClick={this.deleteTodo.bind(this, this.props.data.id, del)}></i>
                      <p>{`${this.props.data.todo_name}`}</p>
                    </div>
                  )
                }
              </Mutation>
            </div>
          )
        }
      </Mutation>
    )
  }
}

export default Todo;
