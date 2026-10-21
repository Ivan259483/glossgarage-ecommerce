import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'

import PageHeader from '../components/PageHeader.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'
import OrderItemsSummary from '../components/OrderItemsSummary.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { cartItemShape } from '../propTypes.js'

function Checkout({ cart, cartCount, cartTotal, onPlaceOrder }) {
  return (
    <>
      <PageHeader title="Checkout" icon="bi-credit-card" subtitle="Almost there! Tell us where to deliver your order." />
      <Container className="section-block">
        {cart.length === 0 ? (
          <EmptyState
            icon="bi-cart-x"
            title="Nothing to check out"
            message="Your cart is empty. Add some products before checking out."
            actionLabel="Shop now"
            actionTo="/"
          />
        ) : (
          <Row className="g-4 flex-column-reverse flex-lg-row">
            <Col lg={7}>
              <CheckoutForm total={cartTotal} onPlaceOrder={onPlaceOrder} />
            </Col>
            <Col lg={5}>
              <OrderItemsSummary items={cart} total={cartTotal} title={`Order Summary (${cartCount})`} />
              <Link to="/cart" className="back-link">
                <i className="bi bi-arrow-left me-1" aria-hidden="true" />
                Edit cart
              </Link>
            </Col>
          </Row>
        )}
      </Container>
    </>
  )
}

Checkout.propTypes = {
  cart: PropTypes.arrayOf(cartItemShape).isRequired,
  cartCount: PropTypes.number.isRequired,
  cartTotal: PropTypes.number.isRequired,
  onPlaceOrder: PropTypes.func.isRequired,
}

export default Checkout
