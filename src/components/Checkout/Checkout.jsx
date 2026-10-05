import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { productsData } from "../../data/products";
import { truncateText } from "../../utils/utils";

export const Checkout = ({ selectedProduct }) => {
  const { cartItems, updateQuantity, triggerOrderSuccess } = useCart();

  // Selected product / main product reference
  const mainProduct = selectedProduct || productsData[0];

  // আলাদা স্টেট ও useEffect বাদ দিয়ে সরাসরি প্রথম ভेरিয়েন্ট বা সিলেক্টেড ভেরিয়েন্ট ট্র্যাক করার জন্য স্টেট
  const [variantId, setVariantId] = useState(
    mainProduct?.variants?.[0]?.id || null,
  );

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  // যদি mainProduct পরিবর্তিত হয় এবং বর্তমান ভেরিয়েন্টটি নতুন পণ্যের সাথে না মেলে, তবে প্রথমটি সিলেক্ট করুন
  const selectedVariant =
    mainProduct?.variants?.find((v) => v.id === variantId) ||
    mainProduct?.variants?.[0] ||
    null;

  // Cart mode check
  const isCartMode = cartItems.length > 0;

  const calculateTotal = () => {
    if (isCartMode) {
      return cartItems.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0,
      );
    }
    return selectedVariant
      ? Number(selectedVariant.price)
      : Number(mainProduct.price);
  };

  const totalAmount = calculateTotal();

  const handleSubmit = (e) => {
    e.preventDefault();
    triggerOrderSuccess();
  };

  return (
    <section
      id="checkout-section"
      className="py-16 bg-white dark:bg-[#0B1322] border-t border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center mb-10">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-2">
            অর্ডার করতে ফর্মটি পূরণ করে নিচে "কনফার্ম অর্ডার" বাটনে ক্লিক করুন
            👉
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 1. Selected Product List / Variants */}
          <div>
            <h3 className="text-base font-bold mb-3 text-slate-800 dark:text-slate-200">
              {isCartMode
                ? "আপনার নির্বাচিত কার্ট প্রোডাক্টসমূহ"
                : "প্রোডাক্ট প্যাকেজ ও পরিমাণ নির্বাচন করুন"}
            </h3>

            <div className="border border-slate-200 dark:border-slate-700 rounded-xl divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50/50 dark:bg-slate-800/40 overflow-hidden">
              {isCartMode ? (
                // 🟢 CART MODE: Multiple Products Purchase Facility
                cartItems.map((item) => (
                  <div
                    key={item.variantId || item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-emerald-50/60 dark:bg-slate-800/90 border-l-4 border-brand-green shadow-sm gap-4"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 flex-1">
                      <input
                        type="checkbox"
                        checked={true}
                        readOnly
                        className="accent-brand-green h-4 w-4 shrink-0"
                      />
                      <img
                        src={item.image || mainProduct.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-md object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                      />
                      <div>
                        <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white block">
                          {item.name}
                        </span>
                        {item.variantTitle && (
                          <span className="text-xs text-slate-500 dark:text-slate-400 block">
                            {item.variantTitle} (একক মূল্য: {item.price}.00৳)
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-4 pl-7 sm:pl-0">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden bg-white dark:bg-slate-900">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.variantId || item.id, -1)
                          }
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-slate-700 dark:text-slate-200 text-sm transition"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-bold text-sm min-w-[32px] text-center text-slate-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.variantId || item.id, 1)
                          }
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-slate-700 dark:text-slate-200 text-sm transition"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-bold text-slate-900 dark:text-white whitespace-nowrap min-w-[80px] text-right">
                        {item.price * item.quantity}.00৳
                      </span>
                    </div>
                  </div>
                ))
              ) : mainProduct?.variants && mainProduct.variants.length > 0 ? (
                mainProduct.variants.map((variant) => {
                  const isSelected = selectedVariant?.id === variant.id;
                  return (
                    <label
                      key={variant.id}
                      className={`p-4 flex items-center justify-between cursor-pointer transition ${
                        isSelected
                          ? "bg-emerald-50/60 dark:bg-slate-800/90 border-l-4 border-brand-green"
                          : "hover:bg-slate-100 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="quickOrderVariant"
                          checked={isSelected}
                          onChange={() => setVariantId(variant.id)}
                          className="accent-brand-green h-4 w-4 shrink-0"
                        />
                        <img
                          src={variant.image || mainProduct.image}
                          alt={variant.title}
                          className="w-12 h-12 rounded-md object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                        />
                        <div>
                          <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white block">
                            {truncateText(
                              `${mainProduct.name} - ${variant.title}`,
                              70,
                            )}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400 block">
                            মূল্য: {variant.price}.00৳
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {variant.price}.00৳
                      </span>
                    </label>
                  );
                })
              ) : (
                <div className="p-4 flex items-center justify-between bg-emerald-50/60 dark:bg-slate-800/90 border-l-4 border-brand-green">
                  <div className="flex items-center gap-3">
                    <img
                      src={mainProduct.image}
                      alt={mainProduct.name}
                      className="w-12 h-12 rounded-md object-cover border shrink-0"
                    />
                    <div>
                      <span className="text-sm font-semibold block">
                        {mainProduct.name}
                      </span>
                      <span className="text-xs text-slate-500">
                        মূল্য: {mainProduct.price}.00৳
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-bold">
                    {mainProduct.price}.00৳
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 2. Billing details & Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Billing Info & Shipping */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-base font-bold mb-3 text-slate-800 dark:text-slate-200">
                  Billing details
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="আপনার নাম *"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:border-brand-green dark:text-white"
                  />
                  <input
                    type="text"
                    required
                    placeholder="গ্রাম / থানা / জেলা *"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:border-brand-green dark:text-white"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="আপনার মোবাইল *"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:border-brand-green dark:text-white"
                  />
                </div>
              </div>

              {/* Free Shipping Badge */}
              <div>
                <h3 className="text-base font-bold mb-3 text-slate-800 dark:text-slate-200">
                  Shipping
                </h3>
                <div className="p-3.5 border border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-lg text-sm font-semibold text-emerald-700 dark:text-emerald-400 flex items-center justify-between">
                  <span>সারা বাংলাদেশ ফ্রি ডেলিভারি</span>
                  <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold">
                    FREE
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h3 className="text-base font-bold mb-3 text-slate-800 dark:text-slate-200">
                  Your order
                </h3>
                <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-5 bg-slate-50/30 dark:bg-slate-800/20">
                  <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <span>Product</span>
                    <span>Subtotal</span>
                  </div>

                  {/* Product items list */}
                  <div className="py-2 border-b border-dashed border-slate-200 dark:border-slate-700 space-y-2">
                    {isCartMode ? (
                      cartItems.map((item) => (
                        <div
                          key={item.variantId || item.id}
                          className="flex items-center justify-between text-xs font-medium"
                        >
                          <span className="text-slate-800 dark:text-slate-200">
                            {item.name}{" "}
                            {item.variantTitle ? `(${item.variantTitle})` : ""}{" "}
                            × {item.quantity}
                          </span>
                          <span className="font-bold">
                            {item.price * item.quantity}.00৳
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span className="text-slate-800 dark:text-slate-200">
                          {truncateText(mainProduct.name, 50)}{" "}
                          {selectedVariant ? `(${selectedVariant.title})` : ""}{" "}
                          × 1
                        </span>
                        <span className="font-bold">
                          {selectedVariant
                            ? selectedVariant.price
                            : mainProduct.price}
                          .00৳
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="py-3 border-b border-slate-200 dark:border-slate-700 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">
                      Subtotal
                    </span>
                    <span className="font-bold">{totalAmount}.00৳</span>
                  </div>

                  <div className="py-3 flex justify-between text-base font-extrabold text-slate-900 dark:text-white">
                    <span>Total</span>
                    <span className="text-brand-green">{totalAmount}.00৳</span>
                  </div>

                  <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-900/90 text-xs text-slate-600 dark:text-slate-400 space-y-2">
                    <p className="font-bold text-slate-800 dark:text-slate-200">
                      Cash on delivery
                    </p>
                    <div className="p-3 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                      পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন।
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-5 py-3.5 rounded-xl bg-brand-green hover:bg-green-600 text-slate-950 font-bold text-base transition flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
                  >
                    <span>🔒 অর্ডার কনফার্ম করুন {totalAmount}.00৳</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
