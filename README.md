# Hasura To-Do

A To-Do application using React, Hasura GraphQL Engine and Auth0.

The app is deployed [here](https://shraddhaag-todo-react.herokuapp.com/). 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need to have Node.js installed in your local machine. You can follow the steps from [here](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04).

### Installing

After making sure Node.js is installed, clone the repository on your local machine. 

Go into the project directory and install all teh dependencies:

```
cd hasura-todo
npm install
```

Make a new file under `src/` named `env.js`

```
export const vars = {
    "GRAPHQL_ENDPOINT": 'https://<YOUR_GRAPHQL_ENDPOINT>',
    "GRAOHQL_REALTIME_ENDPOINT": 'wss://<YOUR_GRAPHQL_ENDPOINT>',
    "DOMAIN": "<YOUR_AUTH0_DOMAIN>"
    "CLIENT_ID": "YOUR_CLIENT_ID_FOR_AUTH0",
    "CALLBACK_URL": "YOUR_CALLBACK_URL"
  }
```

### Deploying Hasura GraphQL Engine and setting up the tables

You can deploy Hasura GraphQL Engine by navigating [here](https://hasura.io/learn/graphql/hasura/setup/).

After deployment, naivgate to the Hasura GraphQL console to make tables under Data section. 

**Table Name**: *todos*

**Fields**:

`todo_id` - integer (auto-increment), primary key, unique

`todo_text` - text

`todo_complete` - boolean

`todo_user` - text

Head to the permissions tab and define a new role `user`: 

For *insert*, *update*, *select*, *delete*:

Under Row insert permission, select *Custom Check*. It's value should be `{"todo_user":{"_eq":"X-Hasura-User-Id"}}`. Also make sure to *Toggle All* under Column permissions. 

As a final step, head over to the application settings on Heroku and set *Config Vars*. 

`HASURA_GRAPHQL_ADMIN_SECRET` : <YOUR_SECRET>

`HASURA_GRAPHQL_JWT_SECRET`: Generate the value from [here](https://hasura.io/jwt-config).

`HASURA_GRAPHQL_LIVE_QUERIES_MULTIPLEXED_REFETCH_INTERVAL`: By default updates are delivered to clients every 1 sec (1000), you can set this value as per your requirement. Read more about it [here](https://docs.hasura.io/1.0/graphql/manual/subscriptions/index.html#execution).


### Auth0 configurations

Make a new application on [Auth0](https://auth0.com/) and make sure you select Single Page Web Application as the application type. 

Add appropriate callback URLs in Allowed Callback URLs and Allowed Web Origins.

Add a new *role* and populate it with the following: 

```
function (user, context, callback) {
  const namespace = "https://hasura.io/jwt/claims";
  context.idToken[namespace] = 
    { 
      'x-hasura-default-role': 'user',
      // do some custom logic to decide allowed roles
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-user-id': user.user_id
    };
  callback(null, user, context);
}
```

And you're done! Run the app using: 

```
yarn start
```
## Deployment

Build the app using `yarn build` and deploy it on Heroku.

## Built With

* [Hasura GraohQL Engine](https://hasura.io/) - Powering the back-end
* [React](https://reactjs.org/) - The front-end JS Library
* [Auth0](https://auth0.com/) - Used for Authentication

## Contributing

All contributions are welcome! :)



