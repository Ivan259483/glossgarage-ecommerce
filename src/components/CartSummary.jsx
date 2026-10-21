import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'

import formatPrice from '../utils/formatPrice.js'

// Totals box on the Cart page
function CartSummary({ itemCount, total, onClearCart }) {
  return (
    <Card className="summary-card">
      <Card.Body>
        <h2 className="summary-title">Order Summary</h2>
        <dl className="summary-list">
          <div>
            <dt>Items</dt>
            <dd>{itemCount}</dd>
          </div>
          <div>
            <dt>Subtotal</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
          <div>
            <dt>Shipping</dt>
            <dd className="text-success">Free</dd>
          </div>
          <div className="summary-total">
            <dt>Total</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
        </dl>
        <div className="d-grid gap-2">
          <Button as={Link} to="/checkout" variant="primary" size="lg">
            Proceed to Checkout <i className="bi bi-arrow-right" aria-hidden="true" />
          </Button>
          <Button as={Link} to="/" variant="outline-primary">
            Continue Shopping
          </Button>
          {onClearCart && (
            <Button variant="link" className="text-danger" onClick={onClearCart}>
              Clear cart
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}

CartSummary.propTypes = {
  itemCount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onClearCart: PropTypes.func,
}

CartSummary.defaultProps = {
  onClearCart: null,
}

export default CartSummary
