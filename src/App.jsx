import { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import initialProducts from './data/products.js'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import OrderSuccess from './pages/OrderSuccess.jsx'
import NotFound from './pages/NotFound.jsx'

// App is the single "source of truth": every piece of shop data lives here in useState
// and is passed down to the pages and components as props.
function App() {
  const navigate = useNavigate()

  // ----- State (all data lives in memory and resets on refresh) -----
  const [products, setProducts] = useState(initialProducts) // product catalog (stock changes after orders)
  const [cart, setCart] = useState([]) // [{ ...product, quantity }]
  const [orders, setOrders] = useState([]) // placed orders
  const [toast, setToast] = useState({ id: 0, show: false, message: '', variant: 'success' })

  // ----- Derived values (computed from cart on every render, never stored separately) -----
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const latestOrder = orders.length > 0 ? orders[orders.length - 1] : null

  // A new id for every toast restarts its 3-second timer (see the key on CartToast in Layout)
  const showToast = (message, variant = 'success') => {
    setToast({ id: Date.now(), show: true, message, variant })
  }

  const hideToast = () => {
    setToast({ ...toast, show: false })
  }

  // ----- Cart handlers -----

  // Adds a product to the cart. If it is already there, only the quantity goes up.
  // The quantity can never go above the product's stock.
  const addToCart = (product, quantity = 1) => {
    const existing = cart.find((item) => item.id === product.id)
    const alreadyInCart = existing ? existing.quantity : 0
    const canAdd = Math.min(quantity, product.stock - alreadyInCart)

    if (canAdd <= 0) {
      showToast(`Only ${product.stock} "${product.name}" in stock, and they're all in your cart.`, 'warning')
      return
    }

    if (existing) {
      // Already in the cart: copy the array with map and replace only this item
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + canAdd } : item)))
    } else {
      // New item: copy the array with spread and add the product with its quantity
      setCart([...cart, { ...product, quantity: canAdd }])
    }

    showToast(`Added ${canAdd} × ${product.name} to your cart.`)
  }

  // + button: raise quantity by 1, but not above the stock
  const increaseQty = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId && item.quantity < item.stock ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    )
  }

  // − button: lower quantity by 1, but not below 1 (use Remove to delete the item)
  const decreaseQty = (productId) => {
    setCart(
      cart.map((item) => (item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)),
    )
  }

  // Remove button: keep every item except the one with this id
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  // ----- Checkout -----

  // Called by the checkout form only after validation passes.
  const placeOrder = (customer) => {
    // 1. Build the order object from the customer details and the current cart
    const order = {
      orderNumber: `GG-${Date.now().toString().slice(-8)}`,
      date: new Date().toISOString(),
      customer,
      items: cart,
      itemCount: cartCount,
      total: cartTotal,
    }

    // 2. Save it in the orders array (spread = new array, the old one is not changed)
    setOrders([...orders, order])

    // 3. Reduce the stock of every product that was bought
    setProducts(
      products.map((product) => {
        const bought = cart.find((item) => item.id === product.id)
        return bought ? { ...product, stock: product.stock - bought.quantity } : product
      }),
    )

    // 4. Empty the cart (the Navbar counter drops to 0) and show the confirmation page
    clearCart()
    navigate('/order-success')
  }

  return (
    <Layout cartCount={cartCount} toast={toast} onCloseToast={hideToast}>
      <Routes>
        <Route path="/" element={<Home products={products} onAddToCart={addToCart} />} />
        <Route
          path="/products/:id"
          element={<ProductDetails products={products} cart={cart} onAddToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              cartCount={cartCount}
              cartTotal={cartTotal}
              onIncrease={increaseQty}
              onDecrease={decreaseQty}
              onRemove={removeFromCart}
              onClearCart={clearCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={<Checkout cart={cart} cartCount={cartCount} cartTotal={cartTotal} onPlaceOrder={placeOrder} />}
        />
        <Route path="/order-success" element={<OrderSuccess order={latestOrder} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App
