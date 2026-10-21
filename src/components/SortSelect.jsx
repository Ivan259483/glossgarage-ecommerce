import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

// Controlled <select> for sorting products by price
function SortSelect({ value, onChange }) {
  return (
    <Form.Group controlId="product-sort">
      <Form.Label className="filter-label">Sort by</Form.Label>
      <Form.Select value={value} onChange={(event) => onChange(event.target.value)}>
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}

SortSelect.propTypes = {
  value: PropTypes.oneOf(SORT_OPTIONS.map((option) => option.value)),
  onChange: PropTypes.func.isRequired,
}

SortSelect.defaultProps = {
  value: 'featured',
}

export default SortSelect
