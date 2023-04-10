import React from 'react';
import Header from './components/Header/Header';
import Drawer from './pages/Drawer/Drawer';
import Home from './pages/Home/Home';
import Order from './pages/Order/Order';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import AppContext from './context';
import CreditCard from './components/Card';


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, itemsResponse] = await Promise.all([
          await axios.get('https://641454e59172235b8691c27b.mockapi.io/cart'),
          await axios.get('https://641454e59172235b8691c27b.mockapi.io/items')
        ]);
        setIsLoading(false);
        setCartItems(cartResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных :(')
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
        await axios.delete(`https://641454e59172235b8691c27b.mockapi.io/cart/${obj.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        await axios.post('https://641454e59172235b8691c27b.mockapi.io/cart', obj);
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину :(')
    }
  }

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://641454e59172235b8691c27b.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter(item => item.id !== id));
    } catch (error) {
      alert('Ошибка при удалении из корзины :(')
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  return (
    <AppContext.Provider value={{ items, cartItems, isItemAdded, onRemoveItem, totalPrice }}>
      <div className="wrapper clear">
      


        <Header/>

        <Routes>
          <Route
            path=""
            exact
            element={
              <Home
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToCart={onAddToCart}
                items={items}
                cartItems={cartItems}
                isLoading={isLoading}
              />
            }
          ></Route>
        </Routes>

        <Routes>
          <Route
            path="drawer"
            exact
            element={
              <Drawer
                items={cartItems}
                onRemove={onRemoveItem}
              />
            }
          />
        </Routes>

        <Routes>
          <Route
            path="order"
            exact
            element={
              <Order
                items={cartItems}
              />
            }
          />
        </Routes>

        <Routes>
          <Route
            path="creditcard"
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
