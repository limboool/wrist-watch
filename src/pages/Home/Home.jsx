import React, { useEffect } from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { fetchCartAndItems, onAddToCart } from '../../store/actions';
import Cart from '../../components/Cart';


const Home = ({ items, fetchCartAndItems, onAddToCart }) => {
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    fetchCartAndItems();
  }, [fetchCartAndItems]);

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return (isLoading ? [...Array(12)] : filtredItems).map((item, index) => (
      <Cart
        key={index}
        loading={isLoading}
        onPlus={(obj) => onAddToCart(obj)}
        {...item}
      />
    ));
  };

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="content">
      <div className="search-box">
        <h1>Наручные часы</h1>
        <div className="search-block">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue('')}
              className="clear cu-p"
              src="/img/btn-remove.svg"
              alt="Clear"
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск..."
          />
        </div>
      </div>
      <div className="d-flex flex-wrap ">{renderItems()}</div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCartAndItems: () => dispatch(fetchCartAndItems()),
    onAddToCart: (obj) => dispatch(onAddToCart(obj)),
  };
};


const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);