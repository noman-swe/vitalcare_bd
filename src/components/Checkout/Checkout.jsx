import { useState } from "react";
import { productsData } from "../../data/products";
import { truncateText } from "../../utils/utils";
import { SectionNameBadge } from "../UI/Badges";
import { IconBrandWhatsapp } from "@tabler/icons-react";

// ⚠️ এখানে আপনার গুগল অ্যাপস স্ক্রিপ্ট ওয়েব অ্যাপ URL টি বসান
const GOOGLE_SHEET_API_URL =
  "https://script.google.com/macros/s/AKfycbzRLIdKiHaUTM2vk_okh7-oqYutTNrMzQw4lGgNPb0TQ2PHOaVnDkMpEfo_uONnc4uc/exec";

export const Checkout = ({ selectedProduct }) => {
  const rawProduct = selectedProduct || productsData[0];
  const discountPercent = rawProduct.discountPercentage || 0;

  // ডাইনামিক্যালি ভ্যারিয়েন্টগুলোতে price ক্যালকুলেট করে যুক্ত করা হচ্ছে
  const mainProduct = {
    ...rawProduct,
    variants: rawProduct.variants.map((v) => {
      const calculatedPrice = Math.round(
        v.originalPrice - (v.originalPrice * discountPercent) / 100,
      );
      return {
        ...v,
        price: calculatedPrice,
      };
    }),
  };

  const [variantId, setVariantId] = useState(
    mainProduct?.variants?.[0]?.id || null,
  );
  const [singleQuantity, setSingleQuantity] = useState(1);
  const [deliveryLocation, setDeliveryLocation] = useState("inside_dhaka");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    note: "",
  });

  const [phoneError, setPhoneError] = useState("");

  const selectedVariant =
    mainProduct?.variants?.find((v) => v.id === variantId) ||
    mainProduct?.variants?.[0] ||
    null;

  const handleSingleQuantityChange = (targetVariantId, delta) => {
    if (selectedVariant?.id !== targetVariantId) {
      setVariantId(targetVariantId);
      setSingleQuantity(Math.max(1, 1 + delta));
    } else {
      setSingleQuantity((prevQty) => Math.max(1, prevQty + delta));
    }
  };

  const deliveryCharge = deliveryLocation === "inside_dhaka" ? 60 : 120;

  const unitPrice = selectedVariant ? Number(selectedVariant.price) : 0;
  const subtotal = unitPrice * singleQuantity;
  const totalAmount = subtotal + deliveryCharge;

  // মোবাইল নম্বর হ্যান্ডলার
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      setFormData({ ...formData, phone: value });
      if (phoneError) setPhoneError("");
    }
  };

  // ফোন নম্বর ভ্যালিডেশন
  const validatePhone = () => {
    const bdPhoneRegex = /^01[3-9]\d{8}$/;

    if (!formData.phone) {
      setPhoneError("ফোন নম্বর প্রদান করা আবশ্যক");
      return false;
    }

    if (!bdPhoneRegex.test(formData.phone)) {
      setPhoneError("সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)");
      return false;
    }

    setPhoneError("");
    return true;
  };

  // অর্ডার সাবমিট এবং রিসেট ফাংশন
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhone()) {
      return;
    }

    setIsSubmitting(true);

    const fullPhoneNumber = `+880${formData.phone}`;

    const orderItems = [
      {
        name: mainProduct.name,
        variantTitle: selectedVariant?.title || "",
        quantity: singleQuantity,
        price: unitPrice,
      },
    ];

    const payload = {
      ...formData,
      phone: fullPhoneNumber,
      deliveryLocation,
      subtotal,
      deliveryCharge,
      totalAmount,
      items: orderItems,
    };

    try {
      const response = await fetch(GOOGLE_SHEET_API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.result === "success") {
        alert(
          "আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে! অর্ডার আইডি: " +
            result.orderId,
        );

        // স্টেট রিসেট করা হচ্ছে
        setSingleQuantity(1);
        setVariantId(mainProduct?.variants?.[0]?.id || null);
        setFormData({
          name: "",
          address: "",
          phone: "",
          note: "",
        });
        setPhoneError("");
      } else {
        alert("অর্ডার প্রসেস করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("নেটওয়ার্ক সমস্যা! পরে আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="checkout-section"
      className="py-16 bg-white dark:bg-[#0B1322] border-t border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <SectionNameBadge badgeTitle={"অর্ডার করুন"} />

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-2 mt-2">
            অর্ডার করতে ফর্মটি পূরণ করে নিচে "কনফার্ম অর্ডার" বাটনে ক্লিক করুন
            👉
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Variants Selection */}
          <div>
            <h3 className="text-base font-bold mb-3 text-slate-800 dark:text-slate-200">
              প্রোডাক্ট প্যাকেজ ও পরিমাণ নির্বাচন করুন
            </h3>

            <div className="border border-slate-200 dark:border-slate-700 rounded-xl divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50/50 dark:bg-slate-800/40 overflow-hidden">
              {mainProduct?.variants && mainProduct.variants.length > 0
                ? mainProduct.variants.map((variant) => {
                    const isSelected = selectedVariant?.id === variant.id;
                    const currentQty = isSelected ? singleQuantity : 1;

                    return (
                      <div
                        key={variant.id}
                        onClick={() => {
                          if (!isSelected) {
                            setVariantId(variant.id);
                            setSingleQuantity(1);
                          }
                        }}
                        className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 cursor-pointer transition gap-4 ${
                          isSelected
                            ? "bg-emerald-50/60 dark:bg-slate-800/90 border-l-4 border-brand-green shadow-sm"
                            : "hover:bg-slate-100 dark:hover:bg-slate-800/50"
                        }`}
                      >
                        <div className="flex items-center gap-3 sm:gap-4 flex-1">
                          <input
                            type="radio"
                            name="quickOrderVariant"
                            checked={isSelected}
                            onChange={() => {
                              setVariantId(variant.id);
                              setSingleQuantity(1);
                            }}
                            className="accent-brand-green h-4 w-4 shrink-0 cursor-pointer"
                          />
                          <img
                            src={variant.image || mainProduct.image}
                            alt={variant.title}
                            className="w-16 h-16 rounded-md object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                          />
                          <div>
                            <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white block">
                              {truncateText(
                                `${mainProduct.name} - ${variant.title}`,
                                70,
                              )}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                              <span>অফার মূল্য: {variant.price}.00৳</span>
                              {variant.originalPrice && (
                                <span className="line-through text-slate-400">
                                  {variant.originalPrice}.00৳
                                </span>
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between w-full sm:w-auto gap-4 pl-7 sm:pl-0">
                          <div
                            className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden bg-white dark:bg-slate-900"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              disabled={isSelected && singleQuantity <= 1}
                              onClick={() =>
                                handleSingleQuantityChange(variant.id, -1)
                              }
                              className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-slate-700 dark:text-slate-200 text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 font-bold text-sm min-w-8 text-center text-slate-900 dark:text-white select-none">
                              {currentQty}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handleSingleQuantityChange(variant.id, 1)
                              }
                              className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-slate-700 dark:text-slate-200 text-sm transition"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-sm font-bold text-slate-900 dark:text-white whitespace-nowrap min-w-20 text-right">
                            {variant.price * currentQty}.00৳
                          </span>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>

          {/* Billing details & Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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

                  {/* Phone Input */}
                  <div>
                    <div
                      className={`flex items-center rounded-lg bg-white dark:bg-slate-900 border ${
                        phoneError
                          ? "border-red-500 dark:border-red-500"
                          : "border-slate-300 dark:border-slate-700 focus-within:border-brand-green"
                      } overflow-hidden`}
                    >
                      <input
                        type="tel"
                        required
                        placeholder="আপনার ১১ ডিজিটের মোবাইল নম্বরটি দিন *"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        onBlur={validatePhone}
                        maxLength={11}
                        className="w-full px-4 py-3 bg-transparent text-sm focus:outline-none dark:text-white"
                      />
                    </div>
                    {phoneError && (
                      <p className="mt-1 text-xs text-red-500 font-medium">
                        {phoneError}
                      </p>
                    )}
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="আপনার ঠিকানা (বাড়ি নং, রোড, থানা, জেলা) *"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:border-brand-green dark:text-white"
                  />

                  <textarea
                    rows={3}
                    placeholder="আপনার বিশেষ কোনো মতামত বা নির্দেশনা থাকলে লিখুন (ঐচ্ছিক)"
                    value={formData.note}
                    onChange={(e) =>
                      setFormData({ ...formData, note: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:border-brand-green dark:text-white resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Delivery Area */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  ডেলিভারি এরিয়া সিলেক্ট করুন
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition ${
                      deliveryLocation === "inside_dhaka"
                        ? "border-brand-green bg-brand-green/10 dark:bg-brand-green/5"
                        : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryLocation === "inside_dhaka"}
                        onChange={() => setDeliveryLocation("inside_dhaka")}
                        className="accent-brand-green"
                      />
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        ঢাকার ভেতরে
                      </span>
                    </div>
                    <span className="text-sm font-bold text-brand-teal dark:text-brand-green">
                      ৳৬০
                    </span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition ${
                      deliveryLocation === "outside_dhaka"
                        ? "border-brand-green bg-brand-green/10 dark:bg-brand-green/5"
                        : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryLocation === "outside_dhaka"}
                        onChange={() => setDeliveryLocation("outside_dhaka")}
                        className="accent-brand-green"
                      />
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        ঢাকার বাইরে
                      </span>
                    </div>
                    <span className="text-sm font-bold text-brand-teal dark:text-brand-green">
                      ৳১২০
                    </span>
                  </label>
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

                  <div className="py-2 border-b border-dashed border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-800 dark:text-slate-200">
                        {truncateText(mainProduct.name, 50)}{" "}
                        {selectedVariant ? `(${selectedVariant.title})` : ""} ×{" "}
                        {singleQuantity}
                      </span>
                      <span className="font-bold">
                        {unitPrice * singleQuantity}.00৳
                      </span>
                    </div>
                  </div>

                  <div className="py-3 border-b border-slate-200 dark:border-slate-700 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">
                      Subtotal
                    </span>
                    <span className="font-bold">{subtotal}.00৳</span>
                  </div>

                  <div className="py-3 border-b border-slate-200 dark:border-slate-700 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">
                      Delivery Charge
                    </span>
                    <span className="font-bold">{deliveryCharge}.00৳</span>
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
                    disabled={isSubmitting}
                    className="w-full mt-5 py-3.5 rounded-xl bg-brand-green hover:bg-green-600 text-slate-950 font-bold text-base transition flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>
                      {isSubmitting
                        ? "অর্ডার প্রসেস হচ্ছে..."
                        : `🔒 অর্ডার কনফার্ম করুন ${totalAmount}.00৳`}
                    </span>
                  </button>

                  {/* হোয়াটসঅ্যাপে অর্ডার অপশন */}
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                      অথবা সরাসরি কথা বলে অর্ডার করতে
                    </p>
                    <a
                      href="https://wa.me/+8801778155184?text=হ্যালো%20VitalCareBD,%20আমি%20ম্যাকা%20কফি%20অর্ডার%20করতে%20চাই"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm transition flex items-center justify-center gap-2 shadow-md"
                    >
                      <IconBrandWhatsapp size={20} />
                      <span>হোয়াটসঅ্যাপে অর্ডার করুন</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;