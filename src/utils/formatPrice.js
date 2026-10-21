// Formats a number as Philippine pesos, e.g. 1299 -> "₱1,299.00"
const pesoFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
})

export default function formatPrice(amount) {
  return pesoFormatter.format(amount)
}
