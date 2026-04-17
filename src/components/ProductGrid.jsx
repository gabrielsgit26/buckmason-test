import ProductCard from "./ProductCard"

function ProductGrid({ products, onOpenModal, onAddToCart }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-10 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onOpenModal={onOpenModal}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}

export default ProductGrid
