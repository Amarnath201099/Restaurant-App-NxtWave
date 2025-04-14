import './index.css'

const DishCategories = props => {
  const {categoryData, updateActiveCategory, isCategoryActive} = props
  const {menuCategory, menuCategoryId} = categoryData

  const changeActiveCategory = () => {
    updateActiveCategory(menuCategoryId)
  }

  const activeCategoryStyle = isCategoryActive ? 'active-category-style' : ''

  return (
    <li className={`each-category ${activeCategoryStyle}`}>
      <button
        onClick={changeActiveCategory}
        type="button"
        className="each-category-btn"
      >
        {menuCategory}
      </button>
    </li>
  )
}

export default DishCategories
