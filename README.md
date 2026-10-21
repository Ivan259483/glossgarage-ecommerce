# GlossGarage: Car Care E-commerce (React + Vite)

GlossGarage is a front-end-only online store for car care and detailing products. It was built with **React 18 + Vite (JavaScript)**, **React Router v7** and **React Bootstrap**.

The store has **no database, no backend server and no API calls**. All products, cart items and orders live in `useState` inside `App.jsx`, so refreshing the page resets everything. That is expected for this activity.

## Features

| # | Requirement | Where |
|---|-------------|-------|
| 1 | **Home / Product listing**: 12 products with image, name, price (₱), short description, category, stock badge, *Add to Cart* and *View Details* | `pages/Home.jsx`, `components/ProductCard.jsx` |
| 2 | **Product details**: large image, full description, price, stock ("In stock: 8 left" / "Out of stock"), quantity picker, back link, related products. An unknown id shows "Product not found" | `pages/ProductDetails.jsx` |
| 3 | **Search + category filter + sort by price**: they work together, with a "No products found" state | `SearchBar`, `CategoryFilter`, `SortSelect` |
| 4 | **Shopping cart**: responsive table with image, price, − / + quantity, subtotal per item, Remove, overall total. Quantity stays between 1 and the stock (the button is disabled and a message says why). Empty cart shows a message and a *Shop now* button | `pages/Cart.jsx`, `CartTable`, `QuantityControl`, `CartSummary` |
| 5 | **Cart counter**: badge in the Navbar showing the total quantity, on every page (also visible on phones) | `components/Navbar.jsx`, `CartBadge` |
| 6 | **Checkout page**: Full Name, Email, Phone, Delivery Address, Payment Method (Cash on Delivery), with an order summary beside it | `pages/Checkout.jsx`, `CheckoutForm` |
| 7 | **Form validation**: controlled inputs, HTML attributes **and** custom JavaScript rules, with red messages on blur and on submit | `CheckoutForm.jsx`, `utils/validateCheckout.js` |
| 8 | **Pagination**: 6 per page with React Bootstrap Pagination (Prev / 1 / 2 / Next), "Showing 1–6 of 12", and a return to page 1 when the filters change | `ProductPagination.jsx` |
| 9 | **Navigation menu**: Home, Cart and Checkout links, with the current page highlighted | `Navbar.jsx` |
| 10 | **Consistent design**: one palette (navy + gloss blue), one font (Poppins), shared Navbar/Footer/PageHeader, hover effects, stock badges, friendly empty states, responsive down to phone width | `index.css`, `Layout.jsx` |

Extras: hero banner, an "Added to cart" **Toast**, an order confirmation page with an order number, stock that goes down after an order, a 404 page, and an `alt` text on every image.

## Routes

| Path | Page |
|------|------|
| `/` | Home + product listing |
| `/products/:id` | Product details |
| `/cart` | Shopping cart |
| `/checkout` | Checkout form |
| `/order-success` | Order confirmation |
| `*` | 404 Not found |

`vercel.json` rewrites every path to `index.html`, so refreshing any route on Vercel works.

## How to run

```bash
npm install
npm run dev       # http://localhost:5173
npm run lint      # oxlint, 0 warnings / 0 errors
npm run build     # production build in dist/
npm run preview   # serve the production build
```

## Folder structure

```
public/
  favicon.svg
  images/               # 12 product illustrations + hero car (SVG, made for this project)
src/
  main.jsx              # imports Bootstrap/CSS, wraps <App> in <BrowserRouter>
  App.jsx               # ALL state (products, cart, orders) + cart/checkout handlers + routes
  index.css             # brand styles on top of Bootstrap
  propTypes.js          # shared PropTypes shapes (product, cart item, order)
  data/products.js      # the 12 hardcoded products + category list
  utils/
    formatPrice.js      # 1299 -> "₱1,299.00"
    validateCheckout.js # custom checkout validation rules
  components/
    Layout.jsx  Navbar.jsx  Footer.jsx  BrandLogo.jsx  CartBadge.jsx  CartToast.jsx  ScrollToTop.jsx
    HeroBanner.jsx  PageHeader.jsx  EmptyState.jsx  StockBadge.jsx
    ProductCard.jsx  ProductGrid.jsx  SearchBar.jsx  CategoryFilter.jsx  SortSelect.jsx  ProductPagination.jsx
    QuantityControl.jsx  CartTable.jsx  CartSummary.jsx  OrderItemsSummary.jsx  CheckoutForm.jsx
  pages/
    Home.jsx  ProductDetails.jsx  Cart.jsx  Checkout.jsx  OrderSuccess.jsx  NotFound.jsx
```

## How the code works

### 1. The state in `App.jsx`

`App` is the single source of truth. It holds three arrays in `useState`:

```js
const [products, setProducts] = useState(initialProducts) // the 12 products (stock can change)
const [cart, setCart] = useState([])                      // [{ ...product, quantity }]
const [orders, setOrders] = useState([])                  // every placed order
```

It also holds a small `toast` object for the "Added to cart" pop-up. No Context, Redux, useReducer or localStorage is used, so everything resets on refresh.

### 2. How props flow to the components

Data goes **down** as props, and actions come **back up** as handler functions passed as props:

```
App (state + handlers)
 ├─ Layout ── Navbar (cartCount) ── CartBadge (count)
 │         └─ CartToast (show, message, onClose)
 ├─ Home (products, onAddToCart)
 │     └─ ProductGrid (products, onAddToCart) ── ProductCard (product, onAddToCart)
 ├─ ProductDetails (products, cart, onAddToCart)
 ├─ Cart (cart, cartCount, cartTotal, onIncrease, onDecrease, onRemove, onClearCart)
 │     ├─ CartTable (items, …) ── QuantityControl (quantity, max, onIncrease, onDecrease)
 │     └─ CartSummary (itemCount, total, onClearCart)
 ├─ Checkout (cart, cartTotal, onPlaceOrder) ── CheckoutForm (total, onPlaceOrder)
 └─ OrderSuccess (order)
```

When a button in `ProductCard` calls `onAddToCart(product)`, it actually runs `addToCart` in `App`. The state changes, React re-renders, and the new values flow back down. That is why the Navbar counter updates instantly.

Every component that receives props declares **PropTypes**: specific types, `PropTypes.shape` for products (shared in `src/propTypes.js`), `.isRequired` for required props and `defaultProps` for optional ones. React is pinned to **18.2.0**, because React 19 ignores propTypes/defaultProps on function components.

### 3. The cart functions (all in `App.jsx`)

All updates are **immutable**. A new array is always created with `map`, `filter` or the spread `...`, and the old one is never changed.

- **`addToCart(product, quantity = 1)`**: looks for the product in the cart. If it is already there, `map` copies the cart and raises only that item's quantity. If not, `[...cart, { ...product, quantity }]` adds it. The amount added is capped at `stock − already in cart`. If nothing more can be added, a warning toast explains why.
- **`increaseQty(id)`**: `map` adds 1, but only if `quantity < stock`.
- **`decreaseQty(id)`**: `map` subtracts 1, but only if `quantity > 1` (use Remove to delete).
- **`removeFromCart(id)`**: `filter` keeps every item except that id.
- **`clearCart()`**: sets the cart to `[]`.

In the cart table, the − and + buttons are also **disabled** at 1 and at the stock limit, and the text "Max reached: only N in stock" explains why.

### 4. How the totals are computed

The count and the total are **not stored** in state. They are **derived** from `cart` with `reduce` on every render, so they can never get out of sync:

```js
const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
```

The subtotal per item is `item.price * item.quantity` (in `CartTable`). Prices are shown with `formatPrice()`, which uses `Intl.NumberFormat('en-PH', { currency: 'PHP' })`.

### 5. How checkout validation works

`CheckoutForm` keeps the form in its own `useState` (`values`, `errors`, `touched`). Every input is **controlled**: `value={values.x}` plus `onChange={handleChange}`.

Two layers of validation:

1. **HTML attributes**: `required`, `type="email"`, `pattern="09[0-9]{9}"`, `minLength`, `maxLength`. The form has `noValidate`, so the browser does not show its own pop-ups. On submit, `form.checkValidity()` still checks these attributes (this is the pattern from the React Bootstrap docs).
2. **Custom JavaScript** in `utils/validateCheckout.js`:
   - **Full name**: letters only, with at least a first and last name
   - **Email**: must match `name@domain.tld`
   - **Phone**: PH mobile number, 11 digits starting with `09` (the input also strips non-digits)
   - **Address**: at least 10 characters
   - **Payment method**: must be "Cash on Delivery"

Errors appear in red under each field **on blur** and **on submit**, and they disappear while typing once the field is fixed. `handleSubmit` stops if `checkValidity()` fails **or** `validateCheckout()` returns any error, so an order can never be placed with errors.

When everything is valid, `onPlaceOrder(customer)` runs `placeOrder` in `App`, which:

1. builds an order (`orderNumber`, `date`, `customer`, `items`, `itemCount`, `total`)
2. adds it to `orders` with spread
3. lowers each bought product's `stock` with `map`
4. clears the cart, so the counter goes to 0
5. navigates to `/order-success`, which shows the latest order. Visiting that page with no order shows a friendly message.

## Credits

Product and hero images are original SVG illustrations made for this project. Icons come from Bootstrap Icons (MIT), and the Poppins font comes from @fontsource (OFL).
