import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumb, Button, Col, Container, Row } from 'react-bootstrap'

import StockBadge from '../components/StockBadge.jsx'
import QuantityControl from '../components/QuantityControl.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import EmptyState from '../components/EmptyState.jsx'
import formatPrice from '../utils/formatPrice.js'
import { cartItemShape, productShape } from '../propTypes.js'

function ProductDetails({ products, cart, onAddToCart }) {
  const { id } = useParams() // the :id part of /products/:id (a string)
  const [quantity, setQuantity] = useState(1)

  const product = products.find((item) => item.id === Number(id))

  if (!product) {
    return (
      <Container className="section-block">
        <EmptyState
          icon="bi-question-circle"
          title="Product not found"
          message="The product you're looking for doesn't exist or may have been removed."
          actionLabel="Back to all products"
          actionTo="/"
        />
      </Container>
    )
  }

  // How many more can still be added = stock minus what's already in the cart
  const inCart = cart.find((item) => item.id === product.id)?.quantity ?? 0
  const available = product.stock - inCart
  const selectedQty = Math.max(1, Math.min(quantity, available)) // keep the picker inside the limits

  const handleAdd = () => {
    onAddToCart(product, selectedQty)
    setQuantity(1)
  }

  const related = products.filter((item) => item.category === product.category && item.id !== product.id)

  return (
    <Container className="section-block">
      <Breadcrumb className="details-breadcrumb">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{product.category}</Breadcrumb.Item>
        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="g-4 g-lg-5 align-items-start">
        <Col md={6}>
          <div className="details-image-wrap">
            <img src={product.image} alt={product.name} className="details-image" width="600" height="450" />
          </div>
        </Col>

        <Col md={6}>
          <span className="category-chip">{product.category}</span>
          <h1 className="details-title">{product.name}</h1>
          <p className="details-price">{formatPrice(product.price)}</p>

          <div className="d-flex align-items-center gap-2 mb-3">
            <StockBadge stock={product.stock} showCount />
            <span className={product.stock === 0 ? 'text-danger fw-semibold' : 'text-muted'}>
              {product.stock === 0 ? 'Out of stock' : `In stock: ${product.stock} left`}
            </span>
          </div>

          <p className="details-description">{product.description}</p>

          {product.stock > 0 && available > 0 && (
            <div className="details-buy">
              <div>
                <span className="filter-label d-block">Quantity</span>
                <QuantityControl
                  quantity={selectedQty}
                  max={available}
                  itemName={product.name}
                  size="lg"
                  onDecrease={() => setQuantity(selectedQty - 1)}
                  onIncrease={() => setQuantity(selectedQty + 1)}
                />
              </div>
              <Button variant="primary" size="lg" onClick={handleAdd} className="details-add-btn">
                <i className="bi bi-bag-plus me-2" aria-hidden="true" />
                Add to Cart · {formatPrice(product.price * selectedQty)}
              </Button>
            </div>
          )}

          {product.stock === 0 && (
            <div className="details-note details-note-danger">
              <i className="bi bi-x-circle me-2" aria-hidden="true" />
              Sorry, this product is sold out. Check back soon!
            </div>
          )}

          {product.stock > 0 && available <= 0 && (
            <div className="details-note">
              <i className="bi bi-info-circle me-2" aria-hidden="true" />
              All {product.stock} available units are already in your cart.
            </div>
          )}

          {inCart > 0 && (
            <p className="mt-3 mb-0">
              <i className="bi bi-bag-check text-success me-1" aria-hidden="true" />
              You have {inCart} in your cart. <Link to="/cart">View cart</Link>
            </p>
          )}

          <Link to="/" className="back-link">
            <i className="bi bi-arrow-left me-1" aria-hidden="true" />
            Back to products
          </Link>
        </Col>
      </Row>

      {related.length > 0 && (
        <section className="related-section" aria-labelledby="related-heading">
          <h2 id="related-heading" className="section-subheading">
            More in {product.category}
          </h2>
          <ProductGrid products={related} onAddToCart={onAddToCart} />
        </section>
      )}
    </Container>
  )
}

ProductDetails.propTypes = {
  products: PropTypes.arrayOf(productShape).isRequired,
  cart: PropTypes.arrayOf(cartItemShape).isRequired,
  onAddToCart: PropTypes.func.isRequired,
}

export default ProductDetails
