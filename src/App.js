import {useState} from 'react'

import {Route, Switch} from 'react-router-dom'

import './App.css'

import Home from './components/Home'
import Login from './components/Login'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'

import CartContext from './context/CartContext'

// write your code here

const App = () => {
  const [cartList, setCartList] = useState([])
  const [restaurantName, setRestaurantName] = useState('UNI Resto Cafe')

  const addCartItem = dishDetails => {
    const isAlreadyPresent = cartList.some(
      eachDish => eachDish.dishId === dishDetails.dishId,
    )

    if (isAlreadyPresent) {
      setCartList(prevState =>
        prevState.map(eachItem =>
          eachItem.dishId === dishDetails.dishId
            ? {...eachItem, quantity: eachItem.quantity + dishDetails.quantity}
            : eachItem,
        ),
      )
    } else {
      setCartList(pervState => [...pervState, dishDetails])
    }
  }

  const removeCartItem = dishId => {
    setCartList(prevState => prevState.filter(item => item.dishId !== dishId))
  }

  const removeAllCartItems = () => setCartList([])

  const incrementCartItemQuantity = dishId => {
    setCartList(prevState =>
      prevState.map(item =>
        item.dishId === dishId ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }

  const decrementCartItemQuantity = dishId => {
    setCartList(prevState =>
      prevState
        .map(item =>
          item.dishId === dishId
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter(item => item.quantity > 0),
    )
  }

  const getRestaurantName = name => {
    setRestaurantName(name)
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        removeAllCartItems,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        getRestaurantName,
        restaurantName,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
      </Switch>
    </CartContext.Provider>
  )
}

export default App
