import { useMemo, useState } from "react"

function ProductCard({ product, onOpenModal, onAddToCart }) {
  const gallery = useMemo(
    () =>
      product.images?.length
        ? product.images
        : [product.image, `${product.image}&sat=-35&contrast=10`],
    [product.image, product.images]
  )
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "")

  const activeImage = gallery[activeImageIndex] || product.image
  const canSlide = gallery.length > 1

  const handleSlide = (direction) => {
    if (!canSlide) return

    setActiveImageIndex((prev) => {
      const nextIndex = prev + direction
      if (nextIndex < 0) return gallery.length - 1
      if (nextIndex >= gallery.length) return 0
      return nextIndex
    })
  }

  const handleQuickView = () => {
    onOpenModal({ ...product, selectedSize: selectedSize || product.sizes?.[0] || "" })
  }

  return (
    <article
      className="group cursor-pointer space-y-3"
      onMouseLeave={() => setActiveImageIndex(0)}
    >
      <div className="relative w-full overflow-hidden bg-[#f5f5f3] text-left">
        <button type="button" onClick={handleQuickView} className="w-full text-left">
        <img
          src={activeImage}
          alt={product.title}
          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        </button>

        <button
          type="button"
          onClick={() => handleSlide(-1)}
          aria-label={`Previous image for ${product.title}`}
          className="absolute left-2 top-1/2 z-20 h-8 w-8 -translate-y-1/2 border border-white/60 bg-white/70 text-sm text-gray-800 opacity-0 transition-all duration-300 hover:bg-white group-hover:opacity-100 disabled:cursor-default disabled:opacity-0"
          disabled={!canSlide}
        >
          &#8249;
        </button>
        <button
          type="button"
          onClick={() => handleSlide(1)}
          aria-label={`Next image for ${product.title}`}
          className="absolute right-2 top-1/2 z-20 h-8 w-8 -translate-y-1/2 border border-white/60 bg-white/70 text-sm text-gray-800 opacity-0 transition-all duration-300 hover:bg-white group-hover:opacity-100 disabled:cursor-default disabled:opacity-0"
          disabled={!canSlide}
        >
          &#8250;
        </button>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 translate-y-full px-3 pb-3 transition-transform duration-300 group-hover:translate-y-0">
          <div
            className="pointer-events-auto mb-2 grid h-10 bg-white/95 text-[15px] text-gray-700"
            style={{ gridTemplateColumns: `repeat(${product.sizes?.length || 1}, minmax(0, 1fr))` }}
          >
            {product.sizes?.map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`border-r border-gray-200 last:border-r-0 ${
                  selectedSize === size ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleQuickView}
            className="w-full bg-[#161a1e] py-2 text-[11px] uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-black"
          >
            Quick View
          </button>
        </div>
      </div>

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
        type="button"
        onClick={() =>
          onAddToCart({
            ...product,
            selectedSize: selectedSize || product.sizes?.[0] || "",
          })
        }
        className="text-[11px] uppercase tracking-[0.16em] text-gray-700 transition-all duration-300 hover:text-black"
      >
        Add to Cart
      </button>
    </article>
  )
}

export default ProductCard
