import React from 'react';
import ContentLoader from 'react-content-loader';
import styles from './Cart.module.scss';
import { useSelector } from 'react-redux';


function Cart({
  id,
  imageUrl,
  onPlus,
  title,
  price,
  loading = false,

}) {

  const isAdded = useSelector(state => state.cartItems.some(obj => Number(obj.parentId) === Number(id)));
  const obj = { id, parentId: id, title, imageUrl, price };
  const onClickPlus = () => {
    onPlus(obj);
  };


  return (
    <div className={styles.items}>
      {
        loading ? (<ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>) : (<>
          <img height={250} src={imageUrl} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            <img className={styles.plus}
              src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} onClick={onClickPlus}
              alt=""></img>
          </div>
        </>
        )}
    </div>
  )
}

export default Cart;