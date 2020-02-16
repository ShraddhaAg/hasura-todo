import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import Content from './Content';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { vars } from './env';
import { getMainDefinition } from "apollo-utilities";

const httpLink = new createHttpLink({
  uri: vars.GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const wsLink = new WebSocketLink(
  new SubscriptionClient(vars.GRAOHQL_REALTIME_ENDPOINT, {
    reconnect: true,
    timeout: 30000,
    connectionParams: () => {
      const token = localStorage.getItem('id_token');
      return {
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        }
      }
    },
    connectionCallback: err => {
      if (err) {
        wsLink.subscriptionClient.close(false, false);
      }
    }
  })
);

// chose the link to use based on operation
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache({
    addTypename: false
  })
});

const provideClient = (component) => {
  return (
    <ApolloProvider client={client}>
      {component}
    </ApolloProvider>
  );
};

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
      <Router history={history}>
        <div>
          <Route path="/" render={(props) => provideClient(<App auth={auth} {...props} />)}/>
          <Route path="/content" render={(props) => provideClient(<Content auth={auth} {...props} />)}/>
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
          }}/>
        </div>
      </Router>
  );
}
