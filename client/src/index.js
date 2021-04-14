import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './index.css';
import App from './App';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
