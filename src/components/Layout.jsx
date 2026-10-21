import PropTypes from 'prop-types'

import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import CartToast from './CartToast.jsx'
import ScrollToTop from './ScrollToTop.jsx'

// Shared page frame: the same Navbar and Footer wrap every route
function Layout({ cartCount, toast, onCloseToast, children }) {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <Navbar cartCount={cartCount} />
      <main className="app-main">{children}</main>
      <Footer />
      <CartToast key={toast.id} show={toast.show} message={toast.message} variant={toast.variant} onClose={onCloseToast} />
    </div>
  )
}

Layout.propTypes = {
  cartCount: PropTypes.number.isRequired,
  toast: PropTypes.shape({
    id: PropTypes.number.isRequired,
    show: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['success', 'warning']).isRequired,
  }).isRequired,
  onCloseToast: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Layout
