import React, { useEffect } from 'react';
import "./index.scss";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCartAndItems, onRemoveItem } from '../../store/actions';
import { calculateTotalPrice } from '../../store/actions';

function Drawer({ cartItems, fetchCartAndItems, onRemoveItem }) {

  const totalPrice = calculateTotalPrice(cartItems);

  useEffect(() => {
    fetchCartAndItems();
  }, [fetchCartAndItems]);

  return (
    <div className="p-40">
      <div className='info-box'>
        <h1>Корзина</h1>
      </div>
      <div className="drawer">
        {
          cartItems.length > 0 ?
            (<div>
              <div className="cartTotalBlock">
                <div className='mr-50'>
                  <span>Итого: </span>
                  <b>{totalPrice} руб.</b>
                </div>
                <Link to="/order">
                  <button className="greyButton">Оформить заказ</button>
                </Link>
              </div>
              <div className="basket">
                {cartItems.map((obj) =>
                  <div key={obj.id} className="cartItem">
                    <div style={{ backgroundImage: `url(${obj.imageUrl})` }}
                      className="cartItemImg">

                    </div>
                    <h5>{obj.title}</h5>
                    <div className="d-flex justify-between align-center">
                      <div>
                        <span>Цена: </span>
                        <b>{obj.price} руб.</b>
                      </div>
                    </div>
                    <img onClick={() => onRemoveItem(obj.id)}
                      className="removeBtn"
                      src="/img/btn-remove.svg"
                      alt="Remove" />
                  </div>)}
              </div>
            </div>) :
            (<div className="cartEmpty">
              <img className="mb-20" alt='' width={120} height={120} src="/img/empty-cart.jpg" />
              <h2>Корзина пустая</h2>
              <p className="opacity-6">Добавьте хотя бы один товар, чтобы оформить заказ</p>
            </div>)
        }
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCartAndItems: () => dispatch(fetchCartAndItems()),
    onRemoveItem: (id) => dispatch(onRemoveItem(id))
  };
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);