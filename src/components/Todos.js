import React from 'react';
import { Subscription } from "react-apollo";
import Todo from './Todo';
import { FetchAllTodos } from '../queries/Queries';
import '../App.css';
import TodoLoader from '../Loaders/TodoLoader';

const Todos = () => (
  <Subscription subscription={FetchAllTodos}>
  {
    ({ loading, error, data }) => {
      if(loading)
        return <TodoLoader />
      if(error)
    return <p className="todo-list">Error {console.log(error)}</p>;

      if(data.todos.length === 0)
        return <h5 className="todo-list">Ace! All done! </h5>;

      return data.todos.map((todo) => (
        <div key={todo.id} data-toggle="tooltip" data-placement="left" title="click to mark completed">
          <Todo data={todo} />
        </div>
      ))
    }
  }
  </Subscription>
);

export default Todos;
