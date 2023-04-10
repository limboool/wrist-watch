import Items from '../../components/Items';
import "./index.scss"

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToCart,
  isLoading,
  isItemAdded
}) {

  const renderItems = () => {
    const filteredItems = items ? items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())) : [];
    return (isLoading ? [...Array(12)] : filteredItems).map((item, index) => (
      <Items
        key={index}
        loading={isLoading}
        {...item}
        onPlus={(obj) => onAddToCart(obj)}
        isItemAdded={isItemAdded(item && item.id)}
      />
    ));
  }

  return (
    <div className="content">
      <div className="search-box">
        <h1>Наручные часы</h1>
        <div className="search-block">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && (<img onClick={() => setSearchValue('')}
            className='clear cu-p' src='/img/btn-remove.svg' alt='Clear' />)}
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
        </div>
      </div>
      <div className="d-flex flex-wrap ">{renderItems()}</div>

    </div>
  )
}

export default Home;