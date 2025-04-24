import {Component} from 'react'

import Loader from 'react-loader-spinner'

import NavBar from '../NavBar'
import DishCategories from '../DishCategories'
import DishItem from '../DishItem'

import CartContext from '../../context/CartContext'

import './index.css'

class Home extends Component {
  state = {
    dishesAndCategoriesList: [],
    activeCategoryId: '',
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
    const {dishesAndCategoriesList, activeCategoryId} = this.state
    const activeCategoryList = dishesAndCategoriesList.find(
      eachList => eachList.menuCategoryId === activeCategoryId,
    )

    return (
      <ul className="category-dishes-container">
        {activeCategoryList.categoryDishes.map(eachItem => (
          <DishItem key={eachItem.dishId} dishData={eachItem} />
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
    const {isLoading, restaurantName} = this.state

    return isLoading ? (
      this.renderLoading()
    ) : (
      <CartContext.Consumer>
        {value => {
          const {getRestaurantName} = value

          if (restaurantName) {
            getRestaurantName(restaurantName)
          }

          return (
            <div>
              <NavBar />
              {this.renderDishCategories()}
              {this.renderDishes()}
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Home
