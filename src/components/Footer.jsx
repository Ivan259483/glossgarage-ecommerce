import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'

import BrandLogo from './BrandLogo.jsx'
import { CATEGORIES } from '../data/products.js'

function Footer() {
  return (
    <footer className="app-footer">
      <Container>
        <Row className="gy-4">
          <Col md={5}>
            <BrandLogo size={28} />
            <p className="mt-3 mb-0 footer-muted">
              Pro-grade car care and detailing products for a showroom shine at home. Cash on Delivery nationwide.
            </p>
          </Col>
          <Col xs={6} md={3}>
            <h2 className="footer-heading">Shop</h2>
            <ul className="list-unstyled footer-links">
              <li>
                <Link to="/">All products</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/checkout">Checkout</Link>
              </li>
            </ul>
          </Col>
          <Col xs={6} md={4}>
            <h2 className="footer-heading">Categories</h2>
            <ul className="list-unstyled footer-muted mb-0">
              {CATEGORIES.map((category) => (
                <li key={category}>{category}</li>
              ))}
            </ul>
          </Col>
        </Row>
        <hr className="footer-divider" />
        <p className="footer-muted small mb-0">
          © 2026 GlossGarage · School project built with React + Vite. Demo store only, no real orders or payments.
        </p>
      </Container>
    </footer>
  )
}

export default Footer
