import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';


// начальное состояние
const initialState = {
  time: new Date(),
};

// редьюсер
function   rootReducer(state = initialState, action) {
  switch (action.type) {
    // обновляем время
    case 'UPDATE_TIME':
      return { ...state, time: new Date() };
    default:
      return state;
  }
}








export const fetchCartItems = () => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_CART_ITEMS_REQUEST' });
    try {
      const response = await axios.get('https://641454e59172235b8691c27b.mockapi.io/cart');
      dispatch({ type: 'FETCH_CART_ITEMS_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_CART_ITEMS_FAILURE', payload: error });
    }
  };
};

export const fetchItems = () => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_ITEMS_REQUEST' });
    try {
      const response = await axios.get('https://641454e59172235b8691c27b.mockapi.io/items');
      dispatch({ type: 'FETCH_ITEMS_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_ITEMS_FAILURE', payload: error });
    }
  };
};

export const addToCart = (obj) => {
  return async (dispatch, getState) => {
    try {
      const { cartItems } = getState();
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        dispatch({ type: 'REMOVE_FROM_CART', payload: obj.id });
        await axios.delete(`https://641454e59172235b8691c27b.mockapi.io/cart/${obj.id}`);
      } else {
        dispatch({ type: 'ADD_TO_CART', payload: obj });
        await axios.post('https://641454e59172235b8691c27b.mockapi.io/cart', obj);
      }
    } catch (error) {
      dispatch({ type: 'ADD_TO_CART_FAILURE', payload: error });
    }
  };
};

export const removeFromCart = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`https://641454e59172235b8691c27b.mockapi.io/cart/${id}`);
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } catch (error) {
      dispatch({ type: 'REMOVE_FROM_CART_FAILURE', payload: error });
    }
  };
};






// создаем store
const store = createStore(   rootReducer, applyMiddleware(thunk));

export default store;





