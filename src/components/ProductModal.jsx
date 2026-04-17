import { useState } from "react"

function ProductModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "")
  const [qty, setQty] = useState(1)

  if (!product) return null

  const size = selectedSize || product.sizes?.[0] || ""

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
      <div className="w-full max-w-3xl bg-white p-5 shadow-xl transition-all duration-300 md:p-6">
        <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">
          <p className="text-[11px] uppercase tracking-[0.16em] text-gray-500">
            Product Details
          </p>
          <button
            onClick={onClose}
            className="text-[11px] uppercase tracking-[0.16em] text-gray-500 transition-opacity duration-300 hover:opacity-60"
          >
            Close
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          <img
            src={product.image}
            alt={product.title}
            className="h-72 w-full object-cover md:h-full md:min-h-80"
          />
          <div className="space-y-3">
            <h2 className="text-2xl font-normal text-gray-900">{product.title}</h2>
            <p className="text-sm text-gray-600">{product.subtitle}</p>
            <p className="text-[11px] uppercase tracking-[0.16em] text-gray-500">
              {product.category} / {product.color}
            </p>
            <p className="text-sm leading-6 text-gray-600">{product.description}</p>
            <div className="space-y-2 border-y border-gray-200 py-3">
              <p className="text-sm text-gray-700">
                <span className="text-gray-500">Fabric:</span> {product.material}
              </p>
              <p className="text-sm text-gray-700">
                <span className="text-gray-500">Fit:</span> {product.fit}
              </p>
              <p className="text-sm text-gray-700">
                <span className="text-gray-500">Origin:</span> {product.madeIn}
              </p>
            </div>
            <ul className="space-y-1 text-sm text-gray-600">
              {product.details?.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <div className="space-y-2 pt-1">
              <p className="text-[11px] uppercase tracking-[0.16em] text-gray-500">
                Select Size
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes?.map((itemSize) => (
                  <button
                    key={itemSize}
                    onClick={() => setSelectedSize(itemSize)}
                    className={`min-w-10 border px-3 py-2 text-xs transition-all ${
                      (selectedSize || product.sizes[0]) === itemSize
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 text-gray-700 hover:border-gray-600"
                    }`}
                  >
                    {itemSize}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <p className="text-base text-gray-900">${product.price}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                  className="h-8 w-8 border border-gray-300 text-sm hover:bg-gray-100"
                >
                  -
                </button>
                <span className="w-5 text-center text-sm">{qty}</span>
                <button
                  onClick={() => setQty((prev) => prev + 1)}
                  className="h-8 w-8 border border-gray-300 text-sm hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => onAddToCart({ ...product, selectedSize: size }, qty)}
              className="mt-4 w-full border border-gray-900 px-4 py-3 text-[11px] uppercase tracking-[0.16em] text-gray-900 transition-all duration-300 hover:bg-gray-900 hover:text-white"
            >
              Add to Cart - ${Number(product.price * qty).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
