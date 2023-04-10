import AppContext from '../../context';
import React from "react";
import "./index.scss"
import { Link } from 'react-router-dom';

function Drawer({ onClose, onRemove, items = [] }) {
  const { totalPrice } = React.useContext(AppContext);
  return (
    <div className="p-40">
      <div className='info-box '>
        <h1>Корзина</h1>
      </div>


      <div className="drawer">
        {
          items.length > 0 ?
            (<div>
              <div className="cartTotalBlock">
                <div className='mr-50'>
                  <span>Итого:</span>
                  <b>{totalPrice} руб.</b>
                </div>
                <Link to="/order">
                  <button className="greyButton">Оформить заказ</button>
                </Link>
              </div>
              <div className="basket">
                {items.map((obj) =>
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
                    <img onClick={() => onRemove(obj.id)}
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

export default Drawer;