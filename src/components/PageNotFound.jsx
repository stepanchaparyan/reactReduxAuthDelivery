import React, { Component } from 'react';
import M from '../Messages';

class PageNotFound extends Component {
  render() {
    return (
      <div className="pageNotFound">
        <h1>{M.get('pageNotFound')}</h1>
      </div>
    );
  }
}

export default PageNotFound;
