import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

// − [qty] + stepper. Buttons are disabled at the limits, and a hint explains why.
function QuantityControl({ quantity, min, max, onDecrease, onIncrease, itemName, size }) {
  const atMin = quantity <= min
  const atMax = quantity >= max

  return (
    <div className="quantity-control-wrap">
      <fieldset className={`quantity-control quantity-control-${size}`}>
        <legend className="visually-hidden">Quantity for {itemName}</legend>
        <Button
          variant="outline-secondary"
          onClick={onDecrease}
          disabled={atMin}
          aria-label={`Decrease quantity of ${itemName}`}
          title={atMin ? `Minimum quantity is ${min}` : 'Decrease quantity'}
        >
          <i className="bi bi-dash-lg" aria-hidden="true" />
        </Button>
        <span className="quantity-value" aria-live="polite">
          {quantity}
        </span>
        <Button
          variant="outline-secondary"
          onClick={onIncrease}
          disabled={atMax}
          aria-label={`Increase quantity of ${itemName}`}
          title={atMax ? `Only ${max} available` : 'Increase quantity'}
        >
          <i className="bi bi-plus-lg" aria-hidden="true" />
        </Button>
      </fieldset>
      {atMax && <small className="quantity-hint">Max reached: only {max} in stock</small>}
    </div>
  )
}

QuantityControl.propTypes = {
  quantity: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onIncrease: PropTypes.func.isRequired,
  itemName: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'lg']),
}

QuantityControl.defaultProps = {
  min: 1,
  itemName: 'item',
  size: 'sm',
}

export default QuantityControl
