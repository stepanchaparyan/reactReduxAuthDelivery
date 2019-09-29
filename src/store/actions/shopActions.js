export const addShop = (shop) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const uid = getState().firebase.auth.uid;
    firestore.collection('shops').add({
      ...shop,
      name: shop.name,
      city: shop.city,
      address: shop.address,
      authorName: profile.displayName,
      uid: uid,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'ADD_SHOP_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'ADD_SHOP_ERROR' }, err);
    });
  };
};

export const updateShop = (data, shopData, shopId) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('shops').doc(shopId).update({
      [data]: shopData
    }).then(() => {
      dispatch({ type: 'UPDATE_SHOP_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'UPDATE_SHOP_ERROR' }, err);
    });
  };
};

export const deleteShop = (id) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('shops').doc(id).delete()
    .then(() => {
      dispatch({ type: 'DELETE_SHOP_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'DELETE_SHOP_ERROR' }, err);
    });
  };
};