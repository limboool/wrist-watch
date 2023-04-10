import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';



// начальное состояние
const initialState = {
  time: new Date(),
};

// редьюсер
function reducer(state = initialState, action) {
  switch (action.type) {
    // обновляем время
    case 'UPDATE_TIME':
      return { ...state, time: new Date() };
    default:
      return state;
  }
}

// создаем store
const store = createStore( reducer, applyMiddleware(thunk));

export default store;





