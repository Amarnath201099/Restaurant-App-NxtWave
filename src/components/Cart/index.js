import {useContext} from 'react'

import NavBar from '../NavBar'
import CartItem from '../CartItem'

import CartContext from '../../context/CartContext'

import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)

  const renderEmpty = () => (
    <div className="empty-cart-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="Empty"
        className="empty-cart-img"
      />
      <p className="empty-cart-description">Your Cart is Empty!!!</p>
    </div>
  )

  const renderCartList = () => (
    <div>
      <div className="cart-container">
        <h1 className="cart-heading">Cart Items</h1>
        <button
          type="button"
          className="remove-all-btn"
          onClick={removeAllCartItems}
        >
          Remove All
        </button>
      </div>
      <ul className="cart-list-container">
        {cartList.map(eachItem => (
          <CartItem key={eachItem.dishId} dishDetails={eachItem} />
        ))}
      </ul>
    </div>
  )

  return (
    <>
      <NavBar />
      {cartList.length > 0 ? renderCartList() : renderEmpty()}
    </>
  )
}

export default Cart
