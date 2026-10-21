import PropTypes from 'prop-types'

// GlossGarage logo: sparkle mark + word mark
function BrandLogo({ size }) {
  return (
    <span className="brand-logo">
      <img src="/favicon.svg" alt="" width={size} height={size} />
      <span className="brand-name">
        Gloss<span className="brand-accent">Garage</span>
      </span>
    </span>
  )
}

BrandLogo.propTypes = {
  size: PropTypes.number,
}

BrandLogo.defaultProps = {
  size: 32,
}

export default BrandLogo
