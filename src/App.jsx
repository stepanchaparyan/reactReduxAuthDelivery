import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory as history} from 'history';
import Routes from './routes';

class App extends Component {
  render() {
    return (
      <BrowserRouter history={history}>
          <Routes />
      </BrowserRouter>
    );
  }
}

export default App;