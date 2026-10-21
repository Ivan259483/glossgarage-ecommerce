import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'

import StockBadge from './StockBadge.jsx'
import formatPrice from '../utils/formatPrice.js'
import { productShape } from '../propTypes.js'

// One product tile in the grid. Receives the product data through props.
function ProductCard({ product, onAddToCart }) {
  const isOutOfStock = product.stock === 0
  const detailsUrl = `/products/${product.id}`

  return (
    <Card className="product-card h-100">
      <Link to={detailsUrl} className="product-card-image-wrap" tabIndex={-1} aria-hidden="true">
        <Card.Img variant="top" src={product.image} alt={product.name} className="product-card-image" loading="lazy" />
      </Link>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
          <span className="category-chip">{product.category}</span>
          <StockBadge stock={product.stock} />
        </div>
        <Card.Title as="h3" className="product-card-title">
          <Link to={detailsUrl}>{product.name}</Link>
        </Card.Title>
        <Card.Text className="product-card-text">{product.shortDescription}</Card.Text>
        <p className="product-price mt-auto mb-3">{formatPrice(product.price)}</p>
        <div className="d-flex gap-2">
          <Button as={Link} to={detailsUrl} variant="outline-primary" className="flex-fill">
            View Details
          </Button>
          <Button
            variant="primary"
            className="flex-fill"
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock}
            aria-label={isOutOfStock ? `${product.name} is sold out` : `Add ${product.name} to cart`}
          >
            {isOutOfStock ? (
              'Sold out'
            ) : (
              <>
                <i className="bi bi-bag-plus me-1" aria-hidden="true" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

ProductCard.propTypes = {
  product: productShape.isRequired,
  onAddToCart: PropTypes.func.isRequired,
}

export default ProductCard
