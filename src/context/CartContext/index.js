import React from 'react'

const CartContext = React.createContext({
  cartList: [0],
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
