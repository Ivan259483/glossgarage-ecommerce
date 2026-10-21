import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'

import formatPrice from '../utils/formatPrice.js'
import { cartItemShape } from '../propTypes.js'

// Compact list of items + total, used beside the checkout form and on the success page
function OrderItemsSummary({ items, total, title }) {
  return (
    <Card className="summary-card">
      <Card.Body>
        <h2 className="summary-title">{title}</h2>
        <ul className="order-items list-unstyled">
          {items.map((item) => (
            <li key={item.id} className="order-item">
              <img src={item.image} alt={item.name} className="order-item-thumb" width="56" height="42" />
              <div className="flex-grow-1">
                <div className="order-item-name">{item.name}</div>
                <div className="text-muted small">
                  {formatPrice(item.price)} × {item.quantity}
                </div>
              </div>
              <div className="fw-semibold">{formatPrice(item.price * item.quantity)}</div>
            </li>
          ))}
        </ul>
        <dl className="summary-list mb-0">
          <div>
            <dt>Shipping</dt>
            <dd className="text-success">Free</dd>
          </div>
          <div className="summary-total">
            <dt>Total</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
        </dl>
      </Card.Body>
    </Card>
  )
}

OrderItemsSummary.propTypes = {
  items: PropTypes.arrayOf(cartItemShape).isRequired,
  total: PropTypes.number.isRequired,
  title: PropTypes.string,
}

OrderItemsSummary.defaultProps = {
  title: 'Your Order',
}

export default OrderItemsSummary
