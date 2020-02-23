import gql from "graphql-tag";

export const AddTodoQuery = gql`
  mutation addTodo($todo_name: String!, $user_id: String!) {
    insert_todos(objects: [
      {
        todo_name: $todo_name,
        user_id: $user_id
        completed: false
      }
    ]) {
      returning {
        id
        todo_name
        completed
        user_id
      }
    }
  }
`;

export const MarkCompletedQuery = gql`
  mutation mark($id: Int!) {
    update_todos(
      where: {id: { _eq: $id }},
      _set: { completed: true }
    ) {
      affected_rows
    }
  }
`;

export const deleteQuery = gql`
  mutation del($id: Int!) {
    delete_todos(
      where: {id: { _eq: $id }}
    ) {
      affected_rows
    }
  }
`;

export const FetchAllTodos = gql`
subscription FetchAllTodos {
  todos(
    order_by:[
			{completed: asc},
      {id: desc}
    ]) {
    completed
    id
    todo_name
    user_id
  }
}

`;  