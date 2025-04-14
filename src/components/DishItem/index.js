import './index.css'

const DishItem = props => {
  const {dishData, addItemToCart, removeItemFromCart, cartList} = props

  const {
    addOnCat,
    dishAvailability,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishId,
    dishImage,
    dishName,
    dishPrice,
    dishType,
  } = dishData

  const addItem = () => {
    addItemToCart(dishData)
  }

  const removeItem = () => {
    removeItemFromCart(dishData)
  }

  const symbolBorderStyle =
    dishType === 1 ? 'non-veg-symbol-border' : 'veg-symbol-border'

  const symbolStyle = dishType === 1 ? 'non-veg-symbol' : 'veg-symbol'

  const dish = cartList.find(eachDish => eachDish.dishId === dishId)
  const dishQuantity = dish ? dish.quantity : 0

  const customizationsAvaliable = addOnCat.length > 0

  return (
    <li className="each-dish-container">
      <div className={`${symbolBorderStyle}`}>
        <div className={`${symbolStyle}`} />
      </div>
      <div className="dish-content-container">
        <h2 className="dish-name">{dishName}</h2>
        <p className="dish-curreny-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dish-description">{dishDescription}</p>
        {dishAvailability ? (
          <div className="dish-amount-container">
            <button type="button" className="btn-style" onClick={removeItem}>
              -
            </button>
            <p className="dish-quantity">{dishQuantity}</p>
            <button type="button" className="btn-style" onClick={addItem}>
              +
            </button>
          </div>
        ) : (
          <p className="dish-not-available">Not available</p>
        )}
        {customizationsAvaliable && (
          <p className="dish-customise">Customizations available</p>
        )}
      </div>
      <p className="dish-calories">{dishCalories} calories</p>
      <div className="dish-img-container">
        <img className="dish-img" src={dishImage} alt={dishName} />
      </div>
    </li>
  )
}

export default DishItem
