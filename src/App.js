import React from 'react';
import Header from './components/Header/Header';
import Drawer from './pages/Drawer/Drawer';
import Home from './pages/Home/Home';
import Order from './pages/Order/Order';

import { Routes, Route } from 'react-router-dom';
import AppContext from './context';
import CreditCard from './components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, fetchItems, addToCart, removeFromCart } from './store/store';

function App() {
  const dispatch = useDispatch();
  const { items, cartItems, isLoading } = useSelector(state => state);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    dispatch(fetchCartItems());
    dispatch(fetchItems());
  }, [dispatch]);

  const onAddToCart = (obj) => {
    dispatch(addToCart(obj));
  };

  const onRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  const totalPrice = cartItems ? cartItems.reduce((sum, obj) => obj.price + sum, 0) : 0;

  return (
    <AppContext.Provider value={{ items, cartItems, isItemAdded, onRemoveItem, totalPrice }}>
      <div className="wrapper clear">
        <Header />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={(event) => setSearchValue(event.target.value)}
                onAddToCart={onAddToCart}
                items={items}
                cartItems={cartItems}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/drawer"
            exact
            element={
              <Drawer
                items={cartItems}
                onRemove={onRemoveItem}
              />
            }
          />
          <Route
            path="/order"
            exact
            element={
              <Order
                items={cartItems}
              />
            }
          />
          <Route
            path="/creditcard"
            exact
            element={
              <CreditCard />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;