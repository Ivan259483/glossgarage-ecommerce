import { useState } from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap'

import validateCheckout, { PAYMENT_METHODS, validateField } from '../utils/validateCheckout.js'
import formatPrice from '../utils/formatPrice.js'

const EMPTY_FORM = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  paymentMethod: '',
}

// Checkout form with fully controlled inputs: every value comes from useState
// and every keystroke goes through handleChange.
function CheckoutForm({ total, onPlaceOrder }) {
  const [values, setValues] = useState(EMPTY_FORM) // what the customer typed
  const [errors, setErrors] = useState({}) // { fieldName: 'error message' }
  const [touched, setTouched] = useState({}) // fields the customer already left (blur)
  const [submitFailed, setSubmitFailed] = useState(false)

  const handleChange = (event) => {
    const { name } = event.target
    let { value } = event.target

    // Phone: keep digits only, max 11 (e.g. "0917 123 4567" -> "09171234567")
    if (name === 'phone') value = value.replace(/\D/g, '').slice(0, 11)

    setValues({ ...values, [name]: value })

    // Re-check a field live once it has been touched, so the error disappears as soon as it's fixed
    if (touched[name]) setErrors({ ...errors, [name]: validateField(name, value) })
  }

  // Validate a field when the customer leaves it
  const handleBlur = (event) => {
    const { name, value } = event.target
    setTouched({ ...touched, [name]: true })
    setErrors({ ...errors, [name]: validateField(name, value) })
  }

  const handleSubmit = (event) => {
    event.preventDefault() // stop the browser from reloading the page

    // 1. HTML validation (required, type="email", pattern, minLength, ...)
    const form = event.currentTarget
    const passesHtmlRules = form.checkValidity()

    // 2. Custom JavaScript validation (stricter rules + clear messages)
    const newErrors = validateCheckout(values)
    setErrors(newErrors)
    setTouched({ fullName: true, email: true, phone: true, address: true, paymentMethod: true })

    // 3. Block the order while any error exists
    if (!passesHtmlRules || Object.keys(newErrors).length > 0) {
      setSubmitFailed(true)
      const firstInvalid = form.querySelector(`[name="${Object.keys(newErrors)[0]}"]`) || form.querySelector(':invalid')
      if (firstInvalid) firstInvalid.focus()
      return
    }

    // 4. Everything is valid: send clean (trimmed) customer details up to App
    onPlaceOrder({
      fullName: values.fullName.trim().replace(/\s+/g, ' '),
      email: values.email.trim(),
      phone: values.phone,
      address: values.address.trim(),
      paymentMethod: values.paymentMethod,
    })
  }

  // Helpers so each input shows red/green only after the customer touched it
  const isInvalid = (field) => Boolean(touched[field] && errors[field])
  const isValid = (field) => Boolean(touched[field] && !errors[field])
  const errorCount = Object.values(errors).filter(Boolean).length

  return (
    <Card className="form-card">
      <Card.Body>
        <h2 className="summary-title">Delivery Details</h2>
        <p className="text-muted small">
          Fields marked <span className="text-danger">*</span> are required.
        </p>

        {submitFailed && errorCount > 0 && (
          <Alert variant="danger" className="py-2" role="alert">
            <i className="bi bi-exclamation-circle me-2" aria-hidden="true" />
            Please fix the {errorCount} highlighted {errorCount === 1 ? 'field' : 'fields'} before placing your order.
          </Alert>
        )}

        {/* noValidate: hide the browser's pop-ups so our own messages show instead.
            The HTML attributes are still checked with form.checkValidity() on submit. */}
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col xs={12}>
              <Form.Group controlId="fullName">
                <Form.Label>
                  Full Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="fullName"
                  type="text"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  minLength={5}
                  maxLength={60}
                  pattern="[\p{L} .'\-]+"
                  autoComplete="name"
                  placeholder="e.g., Juan Dela Cruz"
                  isInvalid={isInvalid('fullName')}
                  isValid={isValid('fullName')}
                />
                <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="email">
                <Form.Label>
                  Email Address <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  maxLength={100}
                  autoComplete="email"
                  placeholder="e.g., juan@email.com"
                  isInvalid={isInvalid('email')}
                  isValid={isValid('email')}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="phone">
                <Form.Label>
                  Phone Number <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  pattern="09[0-9]{9}"
                  minLength={11}
                  maxLength={11}
                  autoComplete="tel"
                  placeholder="09XXXXXXXXX"
                  aria-describedby="phoneHelp"
                  isInvalid={isInvalid('phone')}
                  isValid={isValid('phone')}
                />
                <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                <Form.Text id="phoneHelp">11-digit PH mobile number starting with 09.</Form.Text>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group controlId="address">
                <Form.Label>
                  Delivery Address <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  minLength={10}
                  maxLength={200}
                  autoComplete="street-address"
                  placeholder="House no., street, barangay, city, province"
                  isInvalid={isInvalid('address')}
                  isValid={isValid('address')}
                />
                <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group controlId="paymentMethod">
                <Form.Label>
                  Payment Method <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="paymentMethod"
                  value={values.paymentMethod}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  isInvalid={isInvalid('paymentMethod')}
                  isValid={isValid('paymentMethod')}
                >
                  <option value="">Select a payment method…</option>
                  {PAYMENT_METHODS.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.paymentMethod}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} className="d-grid">
              <Button type="submit" variant="primary" size="lg">
                <i className="bi bi-lock-fill me-2" aria-hidden="true" />
                Place Order · {formatPrice(total)}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

CheckoutForm.propTypes = {
  total: PropTypes.number.isRequired,
  onPlaceOrder: PropTypes.func.isRequired,
}

export default CheckoutForm
