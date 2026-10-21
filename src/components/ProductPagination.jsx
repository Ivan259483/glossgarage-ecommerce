import PropTypes from 'prop-types'
import { Pagination } from 'react-bootstrap'

// "Showing 1–6 of 12 products" + Prev / page numbers / Next (React Bootstrap Pagination)
function ProductPagination({ currentPage, totalPages, totalItems, pageSize, onPageChange }) {
  const firstItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const lastItem = Math.min(currentPage * pageSize, totalItems)
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className="product-pagination">
      <p className="text-muted mb-0" aria-live="polite">
        Showing {firstItem}–{lastItem} of {totalItems} {totalItems === 1 ? 'product' : 'products'}
      </p>

      {totalPages > 1 && (
        <Pagination className="mb-0" aria-label="Product pages">
          <Pagination.Prev disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
            <i className="bi bi-chevron-left" aria-hidden="true" /> Prev
          </Pagination.Prev>
          {pageNumbers.map((page) => (
            <Pagination.Item key={page} active={page === currentPage} onClick={() => onPageChange(page)}>
              {page}
            </Pagination.Item>
          ))}
          <Pagination.Next disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
            Next <i className="bi bi-chevron-right" aria-hidden="true" />
          </Pagination.Next>
        </Pagination>
      )}
    </div>
  )
}

ProductPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  pageSize: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
}

ProductPagination.defaultProps = {
  pageSize: 6,
}

export default ProductPagination
