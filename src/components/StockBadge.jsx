import PropTypes from 'prop-types'
import { Badge } from 'react-bootstrap'

export const LOW_STOCK_LIMIT = 3

// Colored badge: red = out of stock, yellow = low stock (3 or fewer), green = in stock
function StockBadge({ stock, showCount }) {
  if (stock === 0) {
    return (
      <Badge bg="danger" className="stock-badge">
        Out of stock
      </Badge>
    )
  }

  if (stock <= LOW_STOCK_LIMIT) {
    return (
      <Badge bg="warning" text="dark" className="stock-badge">
        Only {stock} left
      </Badge>
    )
  }

  return (
    <Badge bg="success" className="stock-badge">
      {showCount ? `In stock: ${stock}` : 'In stock'}
    </Badge>
  )
}

StockBadge.propTypes = {
  stock: PropTypes.number.isRequired,
  showCount: PropTypes.bool,
}

StockBadge.defaultProps = {
  showCount: false,
}

export default StockBadge
