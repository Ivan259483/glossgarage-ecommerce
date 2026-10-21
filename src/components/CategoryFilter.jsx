import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

export const ALL_CATEGORIES = 'All'

// Row of pill buttons. The selected category is highlighted.
function CategoryFilter({ categories, selected, onSelect }) {
  const options = [ALL_CATEGORIES, ...categories]

  return (
    <fieldset>
      <legend className="filter-label">Category</legend>
      <div className="category-filter">
        {options.map((category) => {
          const isActive = category === selected
          return (
            <Button
              key={category}
              size="sm"
              variant={isActive ? 'primary' : 'outline-primary'}
              className="rounded-pill"
              aria-pressed={isActive}
              onClick={() => onSelect(category)}
            >
              {category}
            </Button>
          )
        })}
      </div>
    </fieldset>
  )
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
}

CategoryFilter.defaultProps = {
  selected: ALL_CATEGORIES,
}

export default CategoryFilter
