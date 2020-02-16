import React from 'react';
import { Subscription } from "react-apollo";
import Todo from './Todo';
import { getCompletedTodos } from '../queries/Queries';
import '../App.css';

const Todos = () => (
  <Subscription subscription={getCompletedTodos}>
  {
    ({ loading, error, data }) => {
      if(loading)
        return <p></p>
      if(error)
        return <p className="todo-list">Error </p>;

      return data.todos.map((todo) => (
        <div key={todo.id} className="todo-list-completed" data-toggle="tooltip" data-placement="left" title="already marked completed">
          <Todo data={todo} />
        </div>
      ))
    }
  }
  </Subscription>
);

export default Todos;
