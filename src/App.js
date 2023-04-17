import React from 'react';
import Header from './components/Header/Header';
import Drawer from './pages/Drawer/Drawer';
import Home from './pages/Home/Home';
import Order from './pages/Order/Order';
import { Routes, Route } from 'react-router-dom';
import CreditCard from './components/Card';



function App() {

  return (

    <div className="wrapper clear">
      <Header />

      <Routes>
        <Route
          path=""
          exact
          element={
            <Home />
          }
        ></Route>
      </Routes>

      <Routes>
        <Route
          path="drawer"
          exact
          element={
            <Drawer />} />
      </Routes>

      <Routes>
        <Route
          path="order"
          exact
          element={
            <Order />
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

  );
}



export default App;
