function CartDrawer({ isOpen, cart, onClose, onUpdateQty, onRemoveFromCart, total }) {
  const drawerClasses = isOpen ? "translate-x-0" : "translate-x-full"

  return (
    <>
      {isOpen && (
        <button
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-300"
          aria-label="Close cart overlay"
        />
      )}

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-sm border-l border-gray-200 bg-white p-5 shadow-lg transition-transform duration-300 ${drawerClasses}`}
      >
        <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">
          <h2 className="text-[11px] uppercase tracking-[0.18em] text-gray-700">
            Shopping Cart
          </h2>
          <button
            onClick={onClose}
            className="text-[11px] uppercase tracking-[0.16em] text-gray-500 transition-all hover:opacity-80"
          >
            Close
          </button>
        </div>

        <div className="space-y-4">
          {cart.length === 0 ? (
            <p className="text-sm text-gray-600">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.itemKey} className="border-b border-gray-100 pb-4">
                <div className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-14 flex-shrink-0 object-cover"
                  />
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-normal">{item.title}</p>
                      <button
                        onClick={() => onRemoveFromCart(item.itemKey)}
                        className="text-[11px] uppercase tracking-[0.16em] text-gray-500 transition-all hover:opacity-80"
                      >
                        Remove
                      </button>
                    </div>
                    {item.selectedSize && (
                      <p className="text-[11px] uppercase tracking-[0.14em] text-gray-500">
                        Size: {item.selectedSize}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">${item.price}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQty(item.itemKey, item.qty - 1)}
                        className="h-7 w-7 border border-gray-300 text-sm transition-colors hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-sm">{item.qty}</span>
                      <button
                        onClick={() => onUpdateQty(item.itemKey, item.qty + 1)}
                        className="h-7 w-7 border border-gray-300 text-sm transition-colors hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 border-t border-gray-200 pt-4">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span>Total</span>
            <span className="font-normal">${total.toFixed(2)}</span>
          </div>
          <button className="w-full border border-gray-900 py-3 text-[11px] uppercase tracking-[0.16em] text-gray-900 transition-all duration-300 hover:bg-gray-900 hover:text-white">
            Checkout
          </button>
        </div>
      </aside>
    </>
  )
}

export default CartDrawer
