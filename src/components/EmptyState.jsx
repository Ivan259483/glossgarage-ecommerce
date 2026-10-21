import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

// Friendly message for empty cart, no search results, 404, etc.
function EmptyState({ icon, title, message, actionLabel, actionTo, onAction }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon" aria-hidden="true">
        <i className={`bi ${icon}`} />
      </div>
      <h2 className="empty-state-title">{title}</h2>
      {message && <p className="empty-state-text">{message}</p>}
      {actionLabel && actionTo && (
        <Button as={Link} to={actionTo} variant="primary">
          {actionLabel}
        </Button>
      )}
      {actionLabel && !actionTo && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

EmptyState.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  actionLabel: PropTypes.string,
  actionTo: PropTypes.string,
  onAction: PropTypes.func,
}

EmptyState.defaultProps = {
  icon: 'bi-inbox',
  message: '',
  actionLabel: '',
  actionTo: '',
  onAction: null,
}

export default EmptyState
