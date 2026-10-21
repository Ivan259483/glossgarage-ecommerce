// Shared PropTypes shapes so every component validates products, cart items
// and orders the same way.
import PropTypes from 'prop-types'

const productFields = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired,
}

export const productShape = PropTypes.shape(productFields)

// A cart item is a product plus the quantity the customer wants
export const cartItemShape = PropTypes.shape({
  ...productFields,
  quantity: PropTypes.number.isRequired,
})

export const customerShape = PropTypes.shape({
  fullName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  paymentMethod: PropTypes.string.isRequired,
})

export const orderShape = PropTypes.shape({
  orderNumber: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  customer: customerShape.isRequired,
  items: PropTypes.arrayOf(cartItemShape).isRequired,
  itemCount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
})
