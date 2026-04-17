function FilterBar({
  categories,
  colors,
  filters,
  setFilters,
  onToggleCart,
  cartCount,
}) {
  return (
    <div className="mb-6 border-b border-gray-200 pb-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:w-[72%]">
          <label className="space-y-1">
            <span className="text-[11px] uppercase tracking-[0.16em] text-gray-500">
              Category
            </span>
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, category: e.target.value }))
              }
              className="w-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition-all duration-300 focus:border-gray-600"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-[11px] uppercase tracking-[0.16em] text-gray-500">
              Color
            </span>
            <select
              value={filters.color}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, color: e.target.value }))
              }
              className="w-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition-all duration-300 focus:border-gray-600"
            >
              {colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-[11px] uppercase tracking-[0.16em] text-gray-500">
              Max Price
            </span>
            <select
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  maxPrice: Number(e.target.value),
                }))
              }
              className="w-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition-all duration-300 focus:border-gray-600"
            >
              {[75, 100, 125, 150, 200].map((price) => (
                <option key={price} value={price}>
                  ${price}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          onClick={onToggleCart}
          className="border border-gray-900 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-gray-900 transition-all duration-300 hover:bg-gray-900 hover:text-white"
        >
          Open Cart ({cartCount})
        </button>
      </div>
    </div>
  )
}

export default FilterBar
