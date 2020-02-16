import React, { Component } from 'react';
import $ from 'jquery';
import { Mutation } from "react-apollo";
import { MarkCompletedQuery, deleteQuery } from '../queries/Queries';
import '../App.css';

class Todo extends Component {
  constructor(props) {
    super(props);
  }

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
            <div className="todos list-group-item" onClick={this.completedTask.bind(this, this.props.data.id, mark)} id={this.props.data.id}>
              <Mutation mutation={deleteQuery}>
                {
                  (del, { data1 }) => (
                    <div>
                      <i className="fas fa-times-circle cross" data-toggle="tooltip" data-placement="top" title="click to delete" onClick={this.deleteTodo.bind(this, this.props.data.id, del)}></i>
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
