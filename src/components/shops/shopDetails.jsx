import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
const ShopDetails = (props) => {

  ShopDetails.propTypes = {
      match: PropTypes.object
  };

  const { shop } = props;
  if (shop) {
    return (
      <div className="container section shop-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{shop.name}</span>
            <p>{shop.content}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Posted by {shop.city} {shop.address}</div>
            <div>2nd September, 2am</div>
          </div>
        </div>
      </div>
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
      shop: shop
    };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'shops'
  }])
)(ShopDetails);