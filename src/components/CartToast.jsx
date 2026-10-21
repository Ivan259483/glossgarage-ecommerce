import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Toast, ToastContainer } from 'react-bootstrap'

// "Added to cart" pop-up (React Bootstrap Toast). Hides itself after 3 seconds.
function CartToast({ show, message, variant, onClose }) {
  const isSuccess = variant === 'success'

  return (
    <ToastContainer position="bottom-end" containerPosition="fixed" className="p-3 toast-stack">
      <Toast show={show} onClose={onClose} delay={3000} autohide className={`app-toast app-toast-${variant}`}>
        <Toast.Header closeButton>
          <i
            className={`bi ${isSuccess ? 'bi-check-circle-fill text-success' : 'bi-exclamation-triangle-fill text-warning'} me-2`}
            aria-hidden="true"
          />
          <strong className="me-auto">{isSuccess ? 'Added to cart' : 'Stock limit reached'}</strong>
        </Toast.Header>
        <Toast.Body>
          <p className="mb-2">{message}</p>
          <Link to="/cart" className="toast-link" onClick={onClose}>
            View cart <i className="bi bi-arrow-right" aria-hidden="true" />
          </Link>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

CartToast.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string,
  variant: PropTypes.oneOf(['success', 'warning']),
  onClose: PropTypes.func.isRequired,
}

CartToast.defaultProps = {
  message: '',
  variant: 'success',
}

export default CartToast
