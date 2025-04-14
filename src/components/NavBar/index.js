import {AiOutlineShoppingCart} from 'react-icons/ai'

import './index.css'

const NavBar = props => {
  const {cartList, restaurantName} = props

  const cartCount = cartList.reduce(
    (acc, currentValue) => acc + currentValue.quantity,
    0,
  )

  return (
    <div className="nav-container">
      <h1 className="main-heading">{restaurantName}</h1>
      <div className="cart-container">
        <p className="nav-my-orders">My Orders</p>
        <div className="cart-icon-container">
          <AiOutlineShoppingCart className="cart-icon" />
          <p className="cart-count">{cartCount}</p>
        </div>
      </div>
    </div>
  )
}
export default NavBar
