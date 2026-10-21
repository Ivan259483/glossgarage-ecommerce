import PropTypes from 'prop-types'
import { Card, Col, Container, Row } from 'react-bootstrap'

import PageHeader from '../components/PageHeader.jsx'
import CartTable from '../components/CartTable.jsx'
import CartSummary from '../components/CartSummary.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { cartItemShape } from '../propTypes.js'

// The Cart page does not own any state: it only displays the cart from App
// and calls App's handlers when a button is clicked.
function Cart({ cart, cartCount, cartTotal, onIncrease, onDecrease, onRemove, onClearCart }) {
  return (
    <>
      <PageHeader
        title="Shopping Cart"
        icon="bi-bag"
        subtitle={cartCount > 0 ? `You have ${cartCount} ${cartCount === 1 ? 'item' : 'items'} in your cart.` : ''}
      />
      <Container className="section-block">
        {cart.length === 0 ? (
          <EmptyState
            icon="bi-bag-x"
            title="Your cart is empty"
            message="Looks like you haven't added anything yet. Let's get your car shining!"
            actionLabel="Shop now"
            actionTo="/"
          />
        ) : (
          <Row className="g-4">
            <Col lg={8}>
              <Card className="cart-card">
                <CartTable items={cart} onIncrease={onIncrease} onDecrease={onDecrease} onRemove={onRemove} />
              </Card>
            </Col>
            <Col lg={4}>
              <CartSummary itemCount={cartCount} total={cartTotal} onClearCart={onClearCart} />
            </Col>
          </Row>
        )}
      </Container>
    </>
  )
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(cartItemShape).isRequired,
  cartCount: PropTypes.number.isRequired,
  cartTotal: PropTypes.number.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onClearCart: PropTypes.func.isRequired,
}

export default Cart
