import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import M from '../../Messages';
import moment from 'moment';

const ShopDetails = (props) => {
  ShopDetails.propTypes = {
      match: PropTypes.object
  };

  const { shop, auth } = props;
  if (!auth.uid) {return <Redirect to='/signin' />;}
  if (shop) {
    return (
      <DocumentTitle title='ShopDetails'>
        <div className="shop__details__page">
          <div className="shop__details__page__description">{M.get('shop.detailsPageTitle')}</div>
          <div className="shop__details__container">
            <div className="shop__name__section"><b>{M.get('shop.name')}</b>:<span className="shop__details">{shop.name}</span></div>
            <div className="shop__name__section"><b>{M.get('shop.city')}</b>:<span className="shop__details">{shop.city}</span></div>
            <div className="shop__name__section"><b>{M.get('shop.address')}</b>:<span className="shop__details">{shop.address}</span></div>
            <div className="shop__name__section"><b>{M.get('shop.authorName')}</b>:<span className="shop__details">{shop.authorName}</span></div>
            <div className="shop__name__section"><b>{M.get('shop.UID')}</b>:<span className="shop__details">{shop.uid}</span></div>
            <div className="shop__name__section"><b>{M.get('shop.createdAt')}</b>:<span className="shop__details">{moment(shop.createdAt.toDate()).calendar()}</span></div>
            <div className="shop__name__section"><b>{M.get('shop.updatedAt')}</b>:<span className="shop__details">{moment(shop.updatedAt.toDate()).calendar()}</span></div>
          </div>
        </div>
      </DocumentTitle>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading shop...</p>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
    // console.log(state);
    const id = ownProps.match.params.id;
    const shops = state.firestore.data.shops;
    const shop = shops ? shops[id] : null;
    return {
      shop: shop,
      auth: state.firebase.auth
    };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'shops'
  }])
)(ShopDetails);