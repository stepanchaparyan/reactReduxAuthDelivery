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
import { Modal } from 'react-components';

class Shops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true
    };

    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static propTypes = {
    auth: PropTypes.shape({
      uid: PropTypes.string
    }),
    shops: PropTypes.arrayOf(PropTypes.object),
    shopsError: PropTypes.object
  };

  onCancel() {
    console.log('cancel');
  }

  onSubmit() {
    console.log('submit');
    this.setState({
      showModal: false
    });
  }

  render() {
    const { shops, auth, shopsError } = this.props;
    console.log('shops props ', this.props);
    if (!auth.uid) {return <Redirect to='/signin' />;}
    return (
      <DocumentTitle title='Shops'>
      {!shopsError ?
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
        </div> :
        <Modal
            title={'Error'}
            isOpen={this.state.showModal}
            onCancel={this.onCancel}
            onSubmit={this.onSubmit}
        >
        <p>You have error: {shopsError}</p>
        </Modal>
      }
      </DocumentTitle>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    shops: state.firestore.ordered.shops,
    auth: state.firebase.auth,
    shopsError: state.shopErrorReducer.authError
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