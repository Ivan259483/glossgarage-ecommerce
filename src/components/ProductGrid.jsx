import PropTypes from 'prop-types'
import { Col, Row } from 'react-bootstrap'

import ProductCard from './ProductCard.jsx'
import { productShape } from '../propTypes.js'

// Responsive grid: 1 column on phones, 2 on tablets, 3 on desktops
function ProductGrid({ products, onAddToCart, columns }) {
  return (
    <Row xs={1} sm={2} lg={columns} className="g-4">
      {products.map((product) => (
        <Col key={product.id}>
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </Col>
      ))}
    </Row>
  )
}

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(productShape).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  columns: PropTypes.number,
}

ProductGrid.defaultProps = {
  columns: 3,
}

export default ProductGrid
