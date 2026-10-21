import PropTypes from 'prop-types'
import { Button, Form, InputGroup } from 'react-bootstrap'

// Controlled search input: the value lives in the parent (Home) state
function SearchBar({ value, onChange, placeholder }) {
  return (
    <Form.Group controlId="product-search">
      <Form.Label className="filter-label">Search</Form.Label>
      <InputGroup>
        <InputGroup.Text>
          <i className="bi bi-search" aria-hidden="true" />
        </InputGroup.Text>
        <Form.Control
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete="off"
        />
        {value && (
          <Button variant="outline-secondary" onClick={() => onChange('')} aria-label="Clear search">
            <i className="bi bi-x-lg" aria-hidden="true" />
          </Button>
        )}
      </InputGroup>
    </Form.Group>
  )
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

SearchBar.defaultProps = {
  placeholder: 'Search products by name…',
}

export default SearchBar
