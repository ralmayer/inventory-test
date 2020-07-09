import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  uri: 'https://rentancy-test.sourcestream.co.uk/graphql',
});

const AUTH_KEY = process.env.GRAPHQL_ENDPOINT_KEY

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: AUTH_KEY
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);