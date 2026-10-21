import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'

import QuantityControl from './QuantityControl.jsx'
import formatPrice from '../utils/formatPrice.js'
import { cartItemShape } from '../propTypes.js'

// Cart items as a table. On phones each row turns into a stacked card (see index.css).
function CartTable({ items, onIncrease, onDecrease, onRemove }) {
  return (
    <Table className="cart-table align-middle mb-0">
      <thead>
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col" className="text-end">
            Subtotal
          </th>
          <th scope="col">
            <span className="visually-hidden">Remove</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td data-label="Product">
              <div className="cart-product">
                <img src={item.image} alt={item.name} className="cart-thumb" width="72" height="54" />
                <div>
                  <Link to={`/products/${item.id}`} className="cart-product-name">
                    {item.name}
                  </Link>
                  <div className="text-muted small">{item.category}</div>
                </div>
              </div>
            </td>
            <td data-label="Price">{formatPrice(item.price)}</td>
            <td data-label="Quantity">
              <QuantityControl
                quantity={item.quantity}
                max={item.stock}
                itemName={item.name}
                onIncrease={() => onIncrease(item.id)}
                onDecrease={() => onDecrease(item.id)}
              />
            </td>
            {/* Subtotal per item = price × quantity */}
            <td data-label="Subtotal" className="text-end fw-semibold">
              {formatPrice(item.price * item.quantity)}
            </td>
            <td className="text-end cart-remove-cell">
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onRemove(item.id)}
                aria-label={`Remove ${item.name} from cart`}
              >
                <i className="bi bi-trash3" aria-hidden="true" />
                <span className="ms-1">Remove</span>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

CartTable.propTypes = {
  items: PropTypes.arrayOf(cartItemShape).isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default CartTable
