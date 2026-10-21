import PropTypes from 'prop-types'
import { Button, Col, Container, Row } from 'react-bootstrap'

const PERKS = [
  { icon: 'bi-cash-coin', text: 'Cash on Delivery' },
  { icon: 'bi-truck', text: 'Ships in 1–3 days' },
  { icon: 'bi-stars', text: 'Pro-grade formulas' },
]

// Big banner at the top of the Home page
function HeroBanner({ productCount }) {
  return (
    <section className="hero">
      <Container>
        <Row className="align-items-center gy-4">
          <Col lg={6}>
            <span className="hero-eyebrow">Car care &amp; detailing</span>
            <h1 className="hero-title">
              Showroom shine, <span className="text-gloss">delivered.</span>
            </h1>
            <p className="hero-text">
              {productCount} hand-picked products for paint, interiors, wheels and tires — everything you need to
              detail like a pro in your own garage.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <Button href="#products" variant="primary" size="lg">
                Shop products <i className="bi bi-arrow-down-short" aria-hidden="true" />
              </Button>
            </div>
            <ul className="hero-perks list-unstyled">
              {PERKS.map((perk) => (
                <li key={perk.text}>
                  <i className={`bi ${perk.icon}`} aria-hidden="true" /> {perk.text}
                </li>
              ))}
            </ul>
          </Col>
          <Col lg={6} className="text-center">
            <img
              src="/images/hero-car.svg"
              alt="Illustration of a freshly detailed blue car with sparkles"
              className="hero-image"
              width="640"
              height="300"
            />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

HeroBanner.propTypes = {
  productCount: PropTypes.number.isRequired,
}

export default HeroBanner
