import PropTypes from 'prop-types'
import { Badge } from 'react-bootstrap'

// Small pill that shows how many items are in the cart
function CartBadge({ count, inline }) {
  return (
    <Badge pill bg="warning" text="dark" className={inline ? 'cart-badge' : 'cart-badge cart-badge-float'}>
      {count}
      <span className="visually-hidden"> items in cart</span>
    </Badge>
  )
}

CartBadge.propTypes = {
  count: PropTypes.number.isRequired,
  inline: PropTypes.bool,
}

CartBadge.defaultProps = {
  inline: false,
}

export default CartBadge
