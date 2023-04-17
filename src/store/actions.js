import axios from 'axios';


export const fetchCartAndItems = () => {
  return async (dispatch) => {
    try {
      const [cartResponse, itemsResponse] = await Promise.all([
        await axios.get('https://641454e59172235b8691c27b.mockapi.io/cart'),
        await axios.get('https://641454e59172235b8691c27b.mockapi.io/items')

      ]);
      dispatch({
        type: 'FETCH_CART_AND_ITEMS_SUCCESS',
        payload: {
          items: itemsResponse.data,
          cartItems: cartResponse.data,
        }
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_CART_AND_ITEMS_FAILURE',
        payload: error.message
      });
    }
  };
};

export const updateCartItems = (cartItems) => {
  return {
    type: 'UPDATE_CART_ITEMS',
    payload: cartItems,
  };

};
export const onAddToCart = (obj) => {
  return async (dispatch, getState) => {
    try {
      console.log('Adding to cart:', obj);
      const cartItems = getState().cartItems;
      if (cartItems.find((cartItems) => Number(cartItems.id) === Number(obj.id))) {
        dispatch({ type: 'REMOVE_FROM_CART', payload: obj.id });
        await axios.delete(`https://641454e59172235b8691c27b.mockapi.io/cart/${obj.id}`);
      } else {
        dispatch({ type: 'ADD_TO_CART', payload: obj });
        await axios.post('https://641454e59172235b8691c27b.mockapi.io/cart', obj);
      }
      const updatedCartResponse = await axios.get('https://641454e59172235b8691c27b.mockapi.io/cart');
      dispatch(updateCartItems(updatedCartResponse.data));
    } catch (error) {
      alert('Ошибка при добавлении в корзину :(');
    }
  };
};

export const onRemoveItem = (id) => {
  return async (dispatch, getState) => {
    try {
      await axios.delete(`https://641454e59172235b8691c27b.mockapi.io/cart/${id}`);
      dispatch({ type: 'REMOVE_CART_ITEM', payload: id });
      const updatedCartResponse = await axios.get('https://641454e59172235b8691c27b.mockapi.io/cart');
      dispatch(updateCartItems(updatedCartResponse.data));
    } catch (error) {
      alert('Ошибка при удалении из корзины :(');
    }
  };
};

export const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
};

