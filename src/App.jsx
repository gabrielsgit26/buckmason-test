import { useMemo, useState } from "react"
import CartDrawer from "./components/CartDrawer"
import FilterBar from "./components/FilterBar"
import ProductGrid from "./components/ProductGrid"
import ProductModal from "./components/ProductModal"
import { products } from "./data/products"

function App() {
  const [filters, setFilters] = useState({
    category: "All",
    color: "All",
    maxPrice: 200,
  })
  const [cart, setCart] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const categories = useMemo(
    () => ["All", ...new Set(products.map((item) => item.category))],
    []
  )
  const colors = useMemo(
    () => ["All", ...new Set(products.map((item) => item.color))],
    []
  )

  const filteredProducts = products.filter(
    (p) =>
      (filters.category === "All" || p.category === filters.category) &&
      (filters.color === "All" || p.color === filters.color) &&
      p.price <= filters.maxPrice
  )

  const addToCart = (product, qty = 1) => {
    const itemKey = `${product.id}-${product.selectedSize || "default"}`

    setCart((prev) => {
      const exists = prev.find((i) => i.itemKey === itemKey)
      if (exists) {
        return prev.map((i) =>
          i.itemKey === itemKey ? { ...i, qty: i.qty + qty } : i
        )
      }
      return [...prev, { ...product, itemKey, qty }]
    })
    setIsCartOpen(true)
  }

  const updateQty = (itemKey, qty) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((item) => item.itemKey !== itemKey))
      return
    }

    setCart((prev) =>
      prev.map((item) => (item.itemKey === itemKey ? { ...item, qty } : item))
    )
  }

  const removeFromCart = (itemKey) => {
    setCart((prev) => prev.filter((item) => item.itemKey !== itemKey))
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)

  return (
    <main className="min-h-screen bg-white px-4 pb-10 pt-4 md:px-8 md:pt-6">
      <div className="mx-auto max-w-[1280px]">
        <header className="mb-8 border-b border-gray-200 pb-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
              Modern American Classics
            </p>
            <button
              onClick={() => setIsCartOpen((prev) => !prev)}
              className="text-[11px] uppercase tracking-[0.18em] text-gray-700 transition-opacity duration-300 hover:opacity-60"
            >
              Cart ({cartCount})
            </button>
          </div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500">
            Inspired by Buck Mason
          </p>
          <h1 className="mt-2 text-2xl font-normal tracking-tight text-gray-900 md:text-3xl">
            Modern American Essentials
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Refined staples built for everyday wear.
          </p>
        </header>

        <FilterBar
          categories={categories}
          colors={colors}
          filters={filters}
          setFilters={setFilters}
          onToggleCart={() => setIsCartOpen((prev) => !prev)}
          cartCount={cartCount}
        />

        <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500">
            Products
          </p>
          <p className="text-sm text-gray-600">{filteredProducts.length} items</p>
        </div>

        <ProductGrid
          products={filteredProducts}
          onOpenModal={setSelectedProduct}
          onAddToCart={addToCart}
        />
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={updateQty}
        onRemoveFromCart={removeFromCart}
        total={total}
      />

      {selectedProduct && (
        <ProductModal
          key={selectedProduct.id}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}
    </main>
  )
}

export default App
