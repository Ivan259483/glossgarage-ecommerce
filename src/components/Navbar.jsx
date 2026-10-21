import PropTypes from 'prop-types'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Container, Nav, Navbar as BsNavbar } from 'react-bootstrap'

import CartBadge from './CartBadge.jsx'
import BrandLogo from './BrandLogo.jsx'

// Top navigation shown on every page. The link that matches the current URL is highlighted.
function Navbar({ cartCount }) {
  const { pathname } = useLocation()

  return (
    <BsNavbar expand="md" sticky="top" variant="dark" collapseOnSelect className="app-navbar">
      <Container>
        <BsNavbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <BrandLogo />
        </BsNavbar.Brand>

        {/* Cart icon outside the collapse so the counter stays visible on phones */}
        <Link to="/cart" className="nav-cart-mobile d-md-none ms-auto me-2" aria-label={`Cart, ${cartCount} items`}>
          <i className="bi bi-bag" aria-hidden="true" />
          <CartBadge count={cartCount} />
        </Link>
        <BsNavbar.Toggle aria-controls="main-nav" />

        <BsNavbar.Collapse id="main-nav">
          <Nav activeKey={pathname} className="ms-auto align-items-md-center gap-md-1">
            <Nav.Link as={NavLink} to="/" end eventKey="/">
              <i className="bi bi-house-door me-1" aria-hidden="true" />
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/cart" eventKey="/cart">
              <i className="bi bi-bag me-1" aria-hidden="true" />
              Cart <CartBadge count={cartCount} inline />
            </Nav.Link>
            <Nav.Link as={NavLink} to="/checkout" eventKey="/checkout">
              <i className="bi bi-credit-card me-1" aria-hidden="true" />
              Checkout
            </Nav.Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  )
}

Navbar.propTypes = {
  cartCount: PropTypes.number.isRequired,
}

export default Navbar
