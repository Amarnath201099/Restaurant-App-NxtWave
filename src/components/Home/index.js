import {Component} from 'react'

import Loader from 'react-loader-spinner'

import NavBar from '../NavBar'
import DishCategories from '../DishCategories'
import DishItem from '../DishItem'

import './index.css'

class Home extends Component {
  state = {
    dishesAndCategoriesList: [],
    activeCategoryId: '',
    cartList: [],
    isLoading: true,
    restaurantName: '',
  }

  componentDidMount() {
    this.getDishesData()
  }

  getDishesData = async () => {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    const data = await response.json()
    const restaurantName = data[0].restaurant_name
    const tableMenuList = data[0].table_menu_list

    const updatedFormatTableMenuList = tableMenuList.map(eachMenu => ({
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        addOnCat: eachDish.addonCat,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        dishCalories: eachDish.dish_calories,
        dishCurrency: eachDish.dish_currency,
        dishDescription: eachDish.dish_description,
        dishId: eachDish.dish_id,
        dishImage: eachDish.dish_image,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        nextUrl: eachDish.nexturl,
      })),
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      nextUrl: eachMenu.nexturl,
    }))

    this.setState({
      dishesAndCategoriesList: updatedFormatTableMenuList,
      activeCategoryId: updatedFormatTableMenuList[0].menuCategoryId,
      isLoading: false,
      restaurantName,
    })
  }

  updateActiveCategory = activeId => {
    this.setState({activeCategoryId: activeId})
  }

  addItemToCart = dishData => {
    const {cartList} = this.state
    const isAlreadyPresent = cartList.some(
      eachDish => eachDish.dishId === dishData.dishId,
    )

    if (isAlreadyPresent) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem =>
          eachItem.dishId === dishData.dishId
            ? {...eachItem, quantity: eachItem.quantity + 1}
            : eachItem,
        ),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, {...dishData, quantity: 1}],
      }))
    }
  }

  removeItemFromCart = dishData => {
    const {cartList} = this.state

    const dishQuantity =
      cartList.find(eachDish => eachDish.dishId === dishData.dishId)
        ?.quantity || 0

    if (dishQuantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem =>
          eachItem.dishId === dishData.dishId
            ? {...eachItem, quantity: eachItem.quantity - 1}
            : eachItem,
        ),
      }))
    } else if (dishQuantity === 1) {
      const newCartList = cartList.filter(
        eachItem => eachItem.dishId !== dishData.dishId,
      )
      this.setState({cartList: [...newCartList]})
    }
  }

  renderDishCategories = () => {
    const {dishesAndCategoriesList, activeCategoryId} = this.state

    return (
      <ul className="categories-container">
        {dishesAndCategoriesList.map(eachItem => (
          <DishCategories
            key={eachItem.menuCategoryId}
            categoryData={eachItem}
            updateActiveCategory={this.updateActiveCategory}
            isCategoryActive={activeCategoryId === eachItem.menuCategoryId}
          />
        ))}
      </ul>
    )
  }

  renderDishes = () => {
    const {dishesAndCategoriesList, activeCategoryId, cartList} = this.state
    const activeCategoryList = dishesAndCategoriesList.find(
      eachList => eachList.menuCategoryId === activeCategoryId,
    )

    return (
      <ul className="category-dishes-container">
        {activeCategoryList.categoryDishes.map(eachItem => (
          <DishItem
            key={eachItem.dishId}
            dishData={eachItem}
            addItemToCart={this.addItemToCart}
            removeItemFromCart={this.removeItemFromCart}
            cartList={cartList}
          />
        ))}
      </ul>
    )
  }

  renderLoading = () => (
    <div className="products-details-loader-container loader-container">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {cartList, isLoading, restaurantName} = this.state

    return isLoading ? (
      this.renderLoading()
    ) : (
      <div>
        <NavBar cartList={cartList} restaurantName={restaurantName} />
        {this.renderDishCategories()}
        {this.renderDishes()}
      </div>
    )
  }
}

export default Home
