import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// начальное состояние
const initialState = {
  time: new Date(),
  cartItems: []
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

// создаем store
const store = createStore(   rootReducer, applyMiddleware(thunk));

export default store;





