# 🛍️ Vintage Fits — Demo (Frontend)

The **Next.js 10** storefront for Vintage Fits. A fully functional e-commerce UI powered by Apollo Client, Styled Components, and Stripe — consuming the Keystone.js GraphQL API from `vintage-fits-server`.

---

## 📋 Overview

| Detail | Value |
|--------|-------|
| Framework | Next.js 10 |
| Styling | Styled Components 5 |
| GraphQL Client | Apollo Client 3 |
| Payments | Stripe (`@stripe/react-stripe-js`) |
| Language | JavaScript (JSX) |
| Dev Port | `7777` |
| API Endpoint | `http://localhost:3000/api/graphql` |

---

## 🗂️ Directory Structure

```
vintage-fits-demo/
├── pages/                    # Next.js file-system routes
│   ├── _app.js               # Global providers — ApolloProvider, CartState, styled-components
│   ├── _document.js          # Custom HTML document for SSR styled-components
│   ├── index.js              # Homepage
│   ├── products.js           # Paginated product listing
│   ├── product/[id].js       # Single product detail
│   ├── sell.js               # Create a new product listing
│   ├── update.js             # Edit an existing product
│   ├── cart.js               # Shopping cart + checkout
│   ├── orders.js             # Order history
│   ├── account.js            # Account settings
│   ├── signin.js             # Sign in + sign up tabs
│   ├── signup.js             # Sign up
│   ├── request-reset.js      # Request password reset email
│   └── reset.js              # Password reset with token
│
├── components/               # Shared React components
│   ├── Page.js               # Root layout wrapper (Header, Nav, global styles)
│   ├── Header.js             # Top header bar
│   ├── Nav.js                # Navigation with cart count badge
│   ├── Dashboard.js          # User dashboard / account summary
│   ├── Products.js           # Product grid with pagination
│   ├── Product.js            # Product card
│   ├── SingleProduct.js      # Full product detail page
│   ├── CreateProduct.js      # Product creation form with Cloudinary upload
│   ├── UpdateProduct.js      # Product edit form
│   ├── DeleteProduct.js      # Delete with cache eviction
│   ├── UserProducts.js       # User's own product listings
│   ├── Cart.js               # Cart slide-out panel
│   ├── CartItem.js           # Individual cart item row
│   ├── CartCount.js          # Animated cart item count bubble
│   ├── AddToCart.js          # Add-to-cart button + mutation
│   ├── RemoveFromCart.js     # Remove from cart button + mutation
│   ├── Checkout.js           # Stripe Elements checkout form
│   ├── SignIn.js             # Sign-in form with Apollo mutation
│   ├── SignOut.js            # Sign-out button
│   ├── SignUp.js             # Sign-up form
│   ├── RequestReset.js       # Password reset request form
│   ├── Reset.js              # Password reset form (with token)
│   ├── Search.js             # Downshift typeahead product search
│   ├── ErrorMessage.js       # GraphQL / network error display
│   ├── User.js               # Current user query + render prop
│   └── styles/               # Global styled-component theme / styles
│
├── lib/
│   ├── apolloClient.js       # Apollo Client factory (SSR + client-side)
│   ├── cartState.js          # React Context for cart open/close state
│   └── paginationField.js    # Apollo pagination key config
│
├── config.js                 # Site-wide constants (perPage, etc.)
├── next.config.js            # Next.js config (env, webpack tweaks)
├── jest.setup.js             # Jest + @testing-library/jest-dom setup
├── .env.local                # Local environment variables (not committed)
├── .npmrc
└── package.json
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in this directory:

```env
# Stripe publishable key (safe to expose — starts with pk_test_ or pk_live_)
NEXT_PUBLIC_STRIPE_KEY=pk_test_...

# GraphQL endpoint — must match the running backend
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000/api/graphql
```

---

## 🚀 Running the Frontend

> Make sure `vintage-fits-server` is running first on port `3000`.

### Development

```bash
npm run dev
```

App available at: <http://localhost:7777>

> Includes `NODE_OPTIONS=--openssl-legacy-provider` for Node 17+ compatibility.

### Production Build

```bash
npm run build
npm run start
```

### Run Tests

```bash
npm test
```

Starts Jest in watch mode using `NODE_ENV=test`.

---

## 🧩 How It Works

### Apollo Client (SSR + Client)

`lib/apolloClient.js` creates an Apollo Client instance wired to the backend GraphQL endpoint via `next-with-apollo`. SSR is handled by `@apollo/react-ssr`'s `getDataFromTree`, which pre-populates the cache on the server before hydration on the client.

### Cart State

The cart open/close state (`cartOpen`, `toggleCart`, `closeCart`) is managed in `lib/cartState.js` via React Context. This allows `Nav.js` to toggle the slide-out cart and `Checkout.js` to close it after a successful order.

### Pagination

`config.js` exports `perPage = 4`. The `Products` component implements Apollo pagination using `fetchMore` and `paginationField`. The `lib/paginationField.js` helper configures Apollo's in-memory cache to correctly merge paginated product results.

### Image Uploads

`CreateProduct.js` uses `apollo-upload-client` with a `createUploadLink` to POST multipart form data (file + GraphQL query) directly to the Keystone backend, which uploads to Cloudinary.

### Stripe Checkout

`Checkout.js` uses `@stripe/react-stripe-js` with `CardElement`. On submit, it calls `stripe.createToken()` and passes the token to the `checkout` GraphQL mutation, which charges the card server-side and returns an `Order`.

---

## 📄 Pages Reference

| Route | Component | Auth Required |
|-------|-----------|:---:|
| `/` | `index.js` → `Products` | No |
| `/products` | `Products` | No |
| `/product/[id]` | `SingleProduct` | No |
| `/sell` | `CreateProduct` | ✅ Yes |
| `/update?id=...` | `UpdateProduct` | ✅ Yes |
| `/cart` | Cart slide-panel (Nav) | No (checkout requires auth) |
| `/orders` | `orders.js` | ✅ Yes |
| `/account` | `Dashboard` | ✅ Yes |
| `/signin` | `SignIn` / `SignUp` tabs | No |
| `/signup` | `SignUp` | No |
| `/request-reset` | `RequestReset` | No |
| `/reset?token=...` | `Reset` | No |

---

## 🎨 Styling

- All styles are written with **Styled Components 5** using tagged template literals
- SSR support is enabled via the `babel-plugin-styled-components` preset in `package.json`'s `babel` config (with `ssr: true, displayName: true`)
- Global styles and CSS custom properties (font-size, colors, etc.) are applied in `components/styles/GlobalStyles.js`
- `nprogress` provides top-of-page loading bars on route transitions (wired in `_app.js`)

---

## 🧪 Testing

Tests use **Jest** + **React Testing Library** + `@apollo/react-testing` for mocking GraphQL queries/mutations.

- Test files live alongside components (e.g., `components/__tests__/`)
- `jest.setup.js` imports `@testing-library/jest-dom` for DOM matchers
- Babel is configured with `preset-env` targeting CommonJS modules in the `test` environment

---

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `next` | React SSR framework |
| `react` / `react-dom` | UI library |
| `@apollo/client` | GraphQL client + cache |
| `next-with-apollo` | Next.js + Apollo SSR glue |
| `apollo-upload-client` | File upload via GraphQL |
| `styled-components` | CSS-in-JS styling |
| `@stripe/react-stripe-js` | Stripe Elements UI components |
| `@stripe/stripe-js` | Stripe.js browser SDK |
| `graphql` | GraphQL runtime |
| `graphql-tag` | `gql` template literal parser |
| `downshift` | Accessible typeahead for search |
| `nprogress` | Route-transition progress bar |
| `date-fns` | Date formatting for orders |
| `lodash.debounce` | Debounce search input |
| `waait` | `await waait()` for test async delays |

---

## ⚠️ Known Issues & Gotchas

### `Cart.js` — Invalid Element Type
If you see `Element type is invalid ... at Cart.js:32`, this means a named import inside `Cart.js` is `undefined`. Check all imports resolve to valid default or named exports.

### `sendUserPasswordResetLink` ValidationError
The backend (keystone-next v9) does not expose `sendUserPasswordResetLink` on the `Mutation` type. The password-reset flow needs to be aligned with how the backend exposes the token. Ignore the validation errors in the server console — the reset token email is still sent via `passwordReset.sendToken`.

### Node.js 17+ OpenSSL
All scripts include `NODE_OPTIONS=--openssl-legacy-provider`. Use **Node 14** or **Node 16** for a friction-free experience.

### `extract-files` Patch
A `postinstall` script removes the `exports` field from `extract-files/package.json` to fix a CJS/ESM interop crash with `apollo-upload-client@14`.

---

## 📄 License

[MIT](./LICENSE)
