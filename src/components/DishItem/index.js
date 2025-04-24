import {useState, useContext} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'

const DishItem = props => {
  const {dishData} = props
  const {addCartItem} = useContext(CartContext)
  const [quantity, setQuantity] = useState(0)

  const {
    addOnCat,
    dishAvailability,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishImage,
    dishName,
    dishPrice,
    dishType,
  } = dishData

  const incrementItemQuantity = () => {
    setQuantity(prevState => prevState + 1)
  }

  const decrementItemQuantity = () => {
    setQuantity(prevState => (prevState > 0 ? prevState - 1 : 0))
  }

  const addItemToCart = () => {
    addCartItem({...dishData, quantity})
  }

  const symbolBorderStyle =
    dishType === 1 ? 'non-veg-symbol-border' : 'veg-symbol-border'

  const symbolStyle = dishType === 1 ? 'non-veg-symbol' : 'veg-symbol'

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
            <button
              type="button"
              className="btn-style"
              onClick={decrementItemQuantity}
            >
              -
            </button>
            <p className="dish-quantity">{quantity}</p>
            <button
              type="button"
              className="btn-style"
              onClick={incrementItemQuantity}
            >
              +
            </button>
          </div>
        ) : (
          <p className="dish-not-available">Not available</p>
        )}
        {customizationsAvaliable && (
          <p className="dish-customise">Customizations available</p>
        )}
        {quantity > 0 ? (
          <button
            type="button"
            className="addtocart-btn"
            onClick={addItemToCart}
          >
            ADD TO CART
          </button>
        ) : (
          ''
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
