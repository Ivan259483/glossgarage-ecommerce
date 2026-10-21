import { useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Container, Row } from 'react-bootstrap'

import HeroBanner from '../components/HeroBanner.jsx'
import SearchBar from '../components/SearchBar.jsx'
import CategoryFilter, { ALL_CATEGORIES } from '../components/CategoryFilter.jsx'
import SortSelect from '../components/SortSelect.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import ProductPagination from '../components/ProductPagination.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { CATEGORIES } from '../data/products.js'
import { productShape } from '../propTypes.js'

const PAGE_SIZE = 6

function Home({ products, onAddToCart }) {
  // Filter / sort / page state only matters on this page, so it lives here
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(ALL_CATEGORIES)
  const [sort, setSort] = useState('featured')
  const [page, setPage] = useState(1)

  // Changing the search, category or sort always goes back to page 1
  const handleSearchChange = (value) => {
    setSearch(value)
    setPage(1)
  }
  const handleCategoryChange = (value) => {
    setCategory(value)
    setPage(1)
  }
  const handleSortChange = (value) => {
    setSort(value)
    setPage(1)
  }
  const resetFilters = () => {
    setSearch('')
    setCategory(ALL_CATEGORIES)
    setSort('featured')
    setPage(1)
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  // 1. Filter: name contains the search text (case-insensitive) AND category matches
  const searchText = search.trim().toLowerCase()
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchText)
    const matchesCategory = category === ALL_CATEGORIES || product.category === category
    return matchesSearch && matchesCategory
  })

  // 2. Sort a copy (never sort the state array itself)
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    return a.id - b.id
  })

  // 3. Paginate: show only PAGE_SIZE products of the current page
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const visibleProducts = sortedProducts.slice(startIndex, startIndex + PAGE_SIZE)

  return (
    <>
      <HeroBanner productCount={products.length} />

      <Container as="section" id="products" className="section-block" aria-labelledby="products-heading">
        <div className="section-heading">
          <h2 id="products-heading">Shop All Products</h2>
          <p className="text-muted mb-0">Find the right product for every part of your car.</p>
        </div>

        <div className="filter-panel">
          <Row className="g-3 align-items-end">
            <Col md={7} lg={8}>
              <SearchBar value={search} onChange={handleSearchChange} />
            </Col>
            <Col md={5} lg={4}>
              <SortSelect value={sort} onChange={handleSortChange} />
            </Col>
            <Col xs={12}>
              <CategoryFilter categories={CATEGORIES} selected={category} onSelect={handleCategoryChange} />
            </Col>
          </Row>
        </div>

        {visibleProducts.length > 0 ? (
          <>
            <ProductGrid products={visibleProducts} onAddToCart={onAddToCart} />
            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={sortedProducts.length}
              pageSize={PAGE_SIZE}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <EmptyState
            icon="bi-search"
            title="No products found"
            message={`We couldn't find anything matching "${search.trim()}"${
              category === ALL_CATEGORIES ? '' : ` in ${category}`
            }. Try another name or category.`}
            actionLabel="Clear filters"
            onAction={resetFilters}
          />
        )}
      </Container>
    </>
  )
}

Home.propTypes = {
  products: PropTypes.arrayOf(productShape).isRequired,
  onAddToCart: PropTypes.func.isRequired,
}

export default Home
