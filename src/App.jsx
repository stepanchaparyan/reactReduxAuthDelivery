import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createBrowserHistory as history} from 'history';
import Navbar from './components/layout/navbar';
import Dashboard from './components/dashboard/dashboard';
import SignIn from './components/auth/signIn';
import SignUp from './components/auth/signUp';
import ForgotPassword from './components/auth/forgotPassword';
import PageNotFound from './components/pageNotFound';
import Shops from './components/shops/shops';

class App extends Component {
  render() {
    return (
      <BrowserRouter history={history}>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' render={() => <Dashboard />} />
            <Route path='/signin' render={() => <SignIn />} />
            <Route path='/signup' render={() => <SignUp />} />
            <Route path='/forgotPassword' render={() => <ForgotPassword />} />
            <Route path='/shops' render={() => <Shops />} />
            <Route path='*' render={() => <PageNotFound />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
