// Custom JavaScript validation for the checkout form.
// Works together with the HTML attributes on the inputs (required, type="email", pattern, ...).
// Each rule returns an error message, or an empty string when the value is valid.

export const PAYMENT_METHODS = ['Cash on Delivery']

const NAME_CHARACTERS = /^[\p{L} .'-]+$/u // letters (incl. ñ, é), spaces, . ' -
const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/ // name@domain.tld
const PH_MOBILE = /^09\d{9}$/ // 09 + 9 digits = 11 digits

export const validators = {
  fullName(value) {
    const name = value.trim()
    if (!name) return 'Full name is required.'
    if (!NAME_CHARACTERS.test(name)) return 'Name can only contain letters (spaces, hyphens and periods are okay).'
    // Count words that contain at least 2 letters, e.g. "Juan Dela Cruz" -> 3 words
    const words = name.split(/\s+/).filter((word) => /\p{L}{2,}/u.test(word))
    if (words.length < 2) return 'Please enter both your first and last name.'
    return ''
  },

  email(value) {
    const email = value.trim()
    if (!email) return 'Email address is required.'
    if (!EMAIL_FORMAT.test(email)) return 'Please enter a valid email address (e.g., juan@email.com).'
    return ''
  },

  phone(value) {
    if (!value) return 'Phone number is required.'
    if (!value.startsWith('09')) return 'Phone number must start with 09.'
    if (!PH_MOBILE.test(value)) return `Phone number must be exactly 11 digits (you entered ${value.length}).`
    return ''
  },

  address(value) {
    const address = value.trim()
    if (!address) return 'Delivery address is required.'
    if (address.length < 10) return 'Please enter a complete address (at least 10 characters).'
    return ''
  },

  paymentMethod(value) {
    if (!PAYMENT_METHODS.includes(value)) return 'Please select a payment method.'
    return ''
  },
}

// Validates a single field by name, e.g. validateField('email', 'abc') -> error message
export function validateField(name, value) {
  return validators[name](value)
}

// Validates the whole form. Returns an object that only contains the fields with errors,
// e.g. { email: 'Please enter a valid email address...' }. An empty object means valid.
export default function validateCheckout(values) {
  const errors = {}
  Object.keys(validators).forEach((field) => {
    const message = validateField(field, values[field])
    if (message) errors[field] = message
  })
  return errors
}
