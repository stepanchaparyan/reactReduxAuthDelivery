import React, { Component } from 'react';
import ShopList from './shopList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import AddShop from './addShop';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import messages from '../../en.messages';

class Shops extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      uid: PropTypes.string
    }),
    shops: PropTypes.arrayOf(PropTypes.object)
  };

  render() {
    const { shops, auth } = this.props;
    if (!auth.uid) {return <Redirect to='/signin' />;}
    return (
      <DocumentTitle title='Shops'>
        <div className="shopPage">
          <div className="shopListTitle">{messages.shopsList}</div>
            <ShopList shops={shops}/>
            <hr />
            <hr />
            <div className="shopListTitle">{messages.addNewShop}</div>
            <hr />
            <hr />
            <AddShop />
            <hr />
        </div>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    shops: state.firestore.ordered.shops,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    {
      collection: 'shops',
      where: [ 'uid', '==', props.auth.uid || null ]
      // orderBy: [ 'name', 'asc' ]
    }
  ])
)(Shops);