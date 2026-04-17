function ProductCard({ product, onOpenModal, onAddToCart }) {
  return (
    <article className="group cursor-pointer space-y-3">
      <button
        onClick={() => onOpenModal(product)}
        className="w-full overflow-hidden bg-[#f5f5f3] text-left"
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </button>

      <div className="space-y-1 border-b border-gray-100 pb-3">
        <p className="text-[11px] uppercase tracking-[0.16em] text-gray-500">
          {product.category}
        </p>
        <h3 className="text-sm font-normal text-gray-900">{product.title}</h3>
        <p className="text-xs text-gray-500">{product.subtitle}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm text-gray-700">${product.price}</p>
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 border border-gray-300"
              style={{ backgroundColor: product.colorHex }}
              aria-hidden="true"
            />
            <span className="text-[11px] uppercase tracking-[0.14em] text-gray-500">
              {product.color}
            </span>
          </div>
        </div>
        <p className="text-xs text-gray-500">{product.material}</p>
      </div>

      <button
        onClick={() => onAddToCart(product)}
        className="text-[11px] uppercase tracking-[0.16em] text-gray-700 transition-all duration-300 hover:text-black"
      >
        Add to Cart
      </button>
    </article>
  )
}

export default ProductCard
