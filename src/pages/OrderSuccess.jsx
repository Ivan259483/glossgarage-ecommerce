import { Link } from 'react-router-dom'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'

import OrderItemsSummary from '../components/OrderItemsSummary.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { orderShape } from '../propTypes.js'

function OrderSuccess({ order }) {
  if (!order) {
    return (
      <Container className="section-block">
        <EmptyState
          icon="bi-receipt"
          title="No recent order"
          message="You haven't placed an order yet. Orders are kept in memory only, so they disappear after a page refresh."
          actionLabel="Go to Home"
          actionTo="/"
        />
      </Container>
    )
  }

  const { customer } = order
  const firstName = customer.fullName.split(' ')[0]
  const orderDate = new Date(order.date).toLocaleString('en-PH', { dateStyle: 'long', timeStyle: 'short' })

  return (
    <Container className="section-block">
      <div className="success-hero">
        <div className="success-icon" aria-hidden="true">
          <i className="bi bi-check-lg" />
        </div>
        <h1 className="page-title">Thank you, {firstName}!</h1>
        <p className="text-muted mb-1">Your order has been placed and will be delivered soon.</p>
        <p className="mb-0">
          Order number <strong className="order-number">{order.orderNumber}</strong> · {orderDate}
        </p>
      </div>

      <Row className="g-4">
        <Col lg={5}>
          <Card className="summary-card h-100">
            <Card.Body>
              <h2 className="summary-title">Delivery Details</h2>
              <dl className="details-list mb-0">
                <dt>Name</dt>
                <dd>{customer.fullName}</dd>
                <dt>Email</dt>
                <dd>{customer.email}</dd>
                <dt>Phone</dt>
                <dd>{customer.phone}</dd>
                <dt>Address</dt>
                <dd>{customer.address}</dd>
                <dt>Payment</dt>
                <dd>
                  <i className="bi bi-cash-coin me-1 text-success" aria-hidden="true" />
                  {customer.paymentMethod}
                </dd>
              </dl>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={7}>
          <OrderItemsSummary items={order.items} total={order.total} title={`Items Ordered (${order.itemCount})`} />
        </Col>
      </Row>

      <div className="text-center mt-4">
        <Button as={Link} to="/" variant="primary" size="lg">
          Continue Shopping
        </Button>
      </div>
    </Container>
  )
}

OrderSuccess.propTypes = {
  order: orderShape,
}

OrderSuccess.defaultProps = {
  order: null,
}

export default OrderSuccess
