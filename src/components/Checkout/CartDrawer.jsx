import { useCart } from "../../context/CartContext";

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
  } = useCart();

  if (!isCartOpen) return null;

  // Checkout সেকশনে নেভিগেট করার ফাংশন
  const handleProceedToCheckout = () => {
    setIsCartOpen(false); // Drawer বন্ধ করা
    const checkoutEl = document.getElementById("checkout-section");
    if (checkoutEl) {
      checkoutEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2">
              🛒 আপনার শপিং কার্ট
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded-full"
            >
              ✕
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-slate-500 space-y-3">
                <p className="text-4xl">🛒</p>
                <p className="text-sm font-semibold">আপনার কার্ট খালি আছে</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.variantId}
                  className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-800/40"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-md object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {item.variantTitle}
                      </p>
                      <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {item.price * item.quantity}.00৳
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-md overflow-hidden bg-white dark:bg-slate-900">
                      <button
                        onClick={() => updateQuantity(item.variantId, -1)}
                        className="px-2 py-0.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.variantId, 1)}
                        className="px-2 py-0.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.variantId)}
                      className="text-xs text-red-500 hover:text-red-700 font-bold p-1"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 space-y-3">
              <div className="flex justify-between text-sm font-semibold">
                <span>ডেলিভারি চার্জ:</span>
                <span className="text-emerald-600 font-bold">ফ্রি</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 dark:text-white">
                <span>সর্বমোট:</span>
                <span className="text-brand-green">{subtotal}.00৳</span>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 rounded-xl bg-brand-green hover:bg-green-600 text-slate-950 font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98"
              >
                <span>অর্ডার ফর্মে এগিয়ে যান 👉 ({subtotal}.00৳)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
