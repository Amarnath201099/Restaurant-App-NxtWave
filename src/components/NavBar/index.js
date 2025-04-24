import {AiOutlineShoppingCart} from 'react-icons/ai'
import {IoLogOutOutline} from 'react-icons/io5'

import {useContext} from 'react'

import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'

import './index.css'

const NavBar = props => {
  const {cartList, restaurantName} = useContext(CartContext)

  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="nav-container">
      <Link to="/" className="link-style">
        <h1 className="main-heading">{restaurantName}</h1>
      </Link>
      <div className="cart-container">
        <p className="nav-my-orders">My Orders</p>
        <Link to="/cart" className="link-style">
          <div className="cart-icon-container">
            <AiOutlineShoppingCart className="cart-icon" data-testid="cart" />
            <p className="cart-count">{cartList.length}</p>
          </div>
        </Link>
        <Link to="/cart" className="icon-link-style">
          <IoLogOutOutline className="logout-icon" onClick={onLogout} />
        </Link>
      </div>
    </div>
  )
}
export default withRouter(NavBar)
