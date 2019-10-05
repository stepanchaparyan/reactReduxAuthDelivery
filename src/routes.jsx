import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/navbar';
import Dashboard from './components/dashboard/dashboard';
import SignIn from './components/auth/signIn';
import SignUp from './components/auth/signUp';
import ForgotPassword from './components/auth/forgotPassword';
import PageNotFound from './components/pageNotFound';
import Shops from './components/shops/shops';
import ShopDetails from './components/shops/shopDetails';

class Routes extends Component {
  render() {
    return (
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/forgotPassword' component={ForgotPassword} />
            <Route exact path='/shops' component={Shops} />
            <Route exact path='/shops/:id' component={ShopDetails} />
            <Route path='*' component={PageNotFound} />
          </Switch>
        </div>
    );
  }
}

export default Routes;