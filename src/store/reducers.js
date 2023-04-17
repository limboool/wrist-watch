const initialState = {
  time: new Date(),
  cartItems: [],
  items: [],
  error: null,
  totalPrice: 0,
  isAdded: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'FETCH_CART_AND_ITEMS_REQUEST': {
      return {
        ...state,
        error: null
      };
    }

    case 'FETCH_CART_AND_ITEMS_SUCCESS': {
      const { cartItems, items } = action.payload;
      return {
        ...state,
        cartItems: cartItems,
        items: items,
        error: null
      };
    }

    case 'FETCH_CART_AND_ITEMS':
      return {
        ...state,
        cartItems: action.payload.cartItems,
      };

    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        isAdded: true,
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
        isAdded: false,
      };

    case 'FETCH_CART_AND_ITEMS_FAILURE': {
      const error = action.payload;
      return {
        ...state,
        error: error
      };
    }

    case 'UPDATE_TIME':
      return { ...state, time: new Date() };

    case 'REMOVE_CART_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };

    case 'SET_TOTAL_PRICE':
      return {
        ...state,
        totalPrice: action.payload,
      };

    case 'CHECK_ITEM_ADDED':
      return { ...state, isAdded: action.payload };

    default:
      return state;
  }
};

export default rootReducer;