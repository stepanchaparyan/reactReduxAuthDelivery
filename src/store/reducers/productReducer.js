const initState = {};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT_SUCCESS':
      console.log('add_product success');
      return state;
    case 'ADD_PRODUCT_ERROR':
      console.log('add_product error');
      return state;

    case 'UPDATE_PRODUCT_SUCCESS':
      console.log('update_product success');
      return state;
    case 'UPDATE_PRODUCT_ERROR':
      console.log('update_product error');
      return state;

    case 'DELETE_PRODUCT_SUCCESS':
      console.log('delete_product success');
      return state;
    case 'DELETE_PRODUCT_ERROR':
      console.log('delete_product error');
      return state;

    default:
      return state;
  }
};

export default productReducer;