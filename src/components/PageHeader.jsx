import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap'

// Title band used at the top of the inner pages (Cart, Checkout, ...)
function PageHeader({ title, subtitle, icon }) {
  return (
    <section className="page-header">
      <Container>
        <h1 className="page-title">
          {icon && <i className={`bi ${icon} me-2`} aria-hidden="true" />}
          {title}
        </h1>
        {subtitle && <p className="page-subtitle mb-0">{subtitle}</p>}
      </Container>
    </section>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.string,
}

PageHeader.defaultProps = {
  subtitle: '',
  icon: '',
}

export default PageHeader
