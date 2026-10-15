import { useEffect, useState, useRef } from "react";
import { productsData } from "../../data/products";
import { truncateText } from "../../utils/utils";
import { SectionNameBadge } from "../UI/Badges";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { useCart } from "../../context/CartContext";

const GOOGLE_SHEET_API_URL = import.meta.env.VITE_GOOGLE_SHEET_API_URL;
const VITE_UNCONFIRMED_CLIENT_GOOGLE_SHEET_API_URL = import.meta.env
  .VITE_UNCONFIRMED_CLIENT_GOOGLE_SHEET_API_URL;

export const Checkout = ({ selectedProduct }) => {
  const { triggerOrderSuccess } = useCart();

  const rawProduct = selectedProduct || productsData[0];
  const discountPercent = rawProduct.discountPercentage || 0;

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

  // 🚀 হ্যাশ লিংক থাকলে অটো-স্ক্রল হ্যান্ডলার
  useEffect(() => {
    if (window.location.hash === "#checkout") {
      const checkoutElem = document.getElementById("checkout");
      if (checkoutElem) {
        setTimeout(() => {
          checkoutElem.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
  }, []);

  const [packType, setPackType] = useState("single");
  const [singleVariantId, setSingleVariantId] = useState(
    mainProduct?.variants?.[0]?.id || null,
  );
  const [singleQuantity, setSingleQuantity] = useState(1);

  const [bothQuantities, setBothQuantities] = useState(() => {
    const initial = {};
    mainProduct?.variants?.forEach((v) => {
      initial[v.id] = 1;
    });
    return initial;
  });

  const [deliveryLocation, setDeliveryLocation] = useState("inside_dhaka");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    note: "",
  });

  const [phoneError, setPhoneError] = useState("");
  const debounceTimerRef = useRef(null);

  const handleSingleQuantityChange = (targetVariantId, delta) => {
    if (singleVariantId !== targetVariantId) {
      setSingleVariantId(targetVariantId);
      setSingleQuantity(Math.max(1, 1 + delta));
    } else {
      setSingleQuantity((prevQty) => Math.max(1, prevQty + delta));
    }
  };

  const handleBothQuantityChange = (variantId, delta) => {
    setBothQuantities((prev) => ({
      ...prev,
      [variantId]: Math.max(1, (prev[variantId] || 1) + delta),
    }));
  };

  const getSelectedOrderItems = () => {
    if (packType === "single") {
      const variant = mainProduct?.variants?.find(
        (v) => v.id === singleVariantId,
      );
      if (!variant) return [];
      return [
        {
          id: variant.id,
          title: variant.title,
          price: variant.price,
          quantity: singleQuantity,
          totalPrice: variant.price * singleQuantity,
        },
      ];
    } else {
      return (
        mainProduct?.variants?.map((variant) => {
          const qty = bothQuantities[variant.id] || 1;
          return {
            id: variant.id,
            title: variant.title,
            price: variant.price,
            quantity: qty,
            totalPrice: variant.price * qty,
          };
        }) || []
      );
    }
  };

  const selectedItems = getSelectedOrderItems();
  const deliveryCharge = deliveryLocation === "inside_dhaka" ? 60 : 120;
  const deliveryAreaText =
    deliveryLocation === "inside_dhaka"
      ? "ঢাকার ভেতরে (৳৬০)"
      : "ঢাকার বাইরে (৳১২০)";

  const subtotal = selectedItems.reduce(
    (acc, item) => acc + item.totalPrice,
    0,
  );
  const totalAmount = subtotal + deliveryCharge;

  // 🔄 অটো-লিড ব্যাকএন্ডে পাঠানোর ফাংশন (unconfirmed-client)
  const sendUnconfirmedLead = async (currentForm) => {
    const bdPhoneRegex = /^01[3-9]\d{8}$/;
    if (!currentForm.phone || !bdPhoneRegex.test(currentForm.phone)) return;

    // const fullPhoneNumber = `${currentForm.phone}`;
    const orderItems = selectedItems.map((item) => ({
      name: mainProduct.name,
      variantTitle: item.title,
      quantity: item.quantity,
      price: item.price,
    }));

    const payload = {
      name: currentForm.name,
      phone: currentForm.phone,
      address: currentForm.address,
      items: orderItems,
      orderStatus: "unconfirmed-client",
    };

    try {
      await fetch(VITE_UNCONFIRMED_CLIENT_GOOGLE_SHEET_API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Auto save lead error:", error);
    }
  };

  // ⌨️ ইনপুট টাইপিং এর সাথে সাথে ২ সেকেন্ডের Debounce সেটিং
  const handleInputChange = (field, value) => {
    const updatedForm = { ...formData, [field]: value };
    setFormData(updatedForm);

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    debounceTimerRef.current = setTimeout(() => {
      sendUnconfirmedLead(updatedForm);
    }, 2000);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      handleInputChange("phone", value);
      if (phoneError) setPhoneError("");
    }
  };

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

  const productDetailsString = selectedItems
    .map(
      (item) =>
        `- ${mainProduct.name} (${item.title}) × ${item.quantity}টি = ৳${item.totalPrice}`,
    )
    .join("\n");

  const whatsappRawMessage = `হ্যালো VitalCareBD, আমি সরাসরি কথা বলে অর্ডার করতে চাই।

*পণ্য:* ${mainProduct.name}
*অর্ডার ধরণ:* ${packType === "single" ? "একক প্যাক" : "উভয় প্যাক কম্বো"}
*প্যাকেজ বিবরণ:*
${productDetailsString}

*সাবটোটাল:* ৳${subtotal}
*ডেলিভারি এরিয়া:* ${deliveryAreaText}
*মোট খরচ:* ৳${totalAmount}

*আমার তথ্য:*
- নাম: 
${formData.name || "[এখানে আপনার নাম লিখুন]"}
- মোবাইল: 
${formData.phone || "[এখানে আপনার নম্বর লিখুন]"}
- ঠিকানা: 
${formData.address || "[এখানে আপনার ঠিকানা লিখুন]"}`;

  const whatsappUrl = `https://wa.me/+8801778155184?text=${encodeURIComponent(
    whatsappRawMessage,
  )}`;

  // 🔒 ফাইনাল অর্ডার কনফার্ম সাবমিট (confirmed)
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (selectedItems.length === 0) {
  //     alert("দয়া করে একটি প্যাকেজ নির্বাচন করুন।");
  //     return;
  //   }

  //   if (!validatePhone()) {
  //     return;
  //   }

  //   if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
  //   setIsSubmitting(true);

  //   // const fullPhoneNumber = `+${formData.phone}`;
  //   const orderItems = selectedItems.map((item) => ({
  //     name: mainProduct.name,
  //     variantTitle: item.title,
  //     quantity: item.quantity,
  //     price: item.price,
  //   }));

  //   const payload = {
  //     ...formData,
  //     items: orderItems,
  //     orderStatus: "confirmed",
  //   };

  //   try {
  //     const response = await fetch(GOOGLE_SHEET_API_URL, {
  //       method: "POST",
  //       headers: { "Content-Type": "text/plain;charset=utf-8" },
  //       body: JSON.stringify(payload),
  //     });

  //     const result = await response.json();

  //     if (result.result === "success") {
  //       triggerOrderSuccess(result.orderId);

  //       setSingleQuantity(1);
  //       setSingleVariantId(mainProduct?.variants?.[0]?.id || null);
  //       const resetBoth = {};
  //       mainProduct?.variants?.forEach((v) => {
  //         resetBoth[v.id] = 1;
  //       });
  //       setBothQuantities(resetBoth);
  //       setFormData({
  //         name: "",
  //         address: "",
  //         phone: "",
  //         note: "",
  //       });
  //       setPhoneError("");
  //     } else {
  //       alert("অর্ডার প্রসেস করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting order:", error);
  //     alert("নেটওয়ার্ক সমস্যা! পরে আবার চেষ্টা করুন।");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // 🔒 ফাইনাল অর্ডার কনফার্ম সাবমিট (confirmed)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedItems.length === 0) {
      alert("দয়া করে একটি প্যাকেজ নির্বাচন করুন।");
      return;
    }

    if (!validatePhone()) {
      return;
    }

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    setIsSubmitting(true);

    const orderItems = selectedItems.map((item) => ({
      name: mainProduct.name,
      variantTitle: item.title,
      quantity: item.quantity,
      price: item.price,
    }));

    const payload = {
      ...formData,
      items: orderItems,
      orderStatus: "confirmed",
    };

    try {
      const response = await fetch(GOOGLE_SHEET_API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.result === "success") {
        // 🗑️ অর্ডার কনফার্ম হলে আনকনফার্মড শিট থেকে এই নাম্বারের ডাটা রিমুভ করার জন্য রিকোয়েস্ট পাঠানো
        try {
          await fetch(VITE_UNCONFIRMED_CLIENT_GOOGLE_SHEET_API_URL, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({ action: "delete", phone: formData.phone }),
          });
        } catch (delErr) {
          console.error("Failed to delete unconfirmed lead:", delErr);
        }

        triggerOrderSuccess(result.orderId);

        setSingleQuantity(1);
        setSingleVariantId(mainProduct?.variants?.[0]?.id || null);
        const resetBoth = {};
        mainProduct?.variants?.forEach((v) => {
          resetBoth[v.id] = 1;
        });
        setBothQuantities(resetBoth);
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
      id="checkout"
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
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-3">
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                প্রোডাক্ট প্যাকেজ ও পরিমাণ নির্বাচন করুন
              </h3>

              <div className="inline-flex p-1 bg-slate-200 dark:bg-slate-800 rounded-xl self-start sm:self-auto border border-slate-300 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setPackType("single")}
                  className={`px-4 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition ${
                    packType === "single"
                      ? "bg-brand-green text-slate-950 shadow-md"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  একক প্যাক (Ekok Pack)
                </button>
                <button
                  type="button"
                  onClick={() => setPackType("both")}
                  className={`px-4 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition ${
                    packType === "both"
                      ? "bg-brand-green text-slate-950 shadow-md"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  উভয় প্যাক (Both Pack)
                </button>
              </div>
            </div>

            <div className="border border-slate-200 dark:border-slate-700 rounded-xl divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50/50 dark:bg-slate-800/40 overflow-hidden">
              {mainProduct?.variants && mainProduct.variants.length > 0
                ? mainProduct.variants.map((variant) => {
                    const isSingleMode = packType === "single";
                    const isSelectedInSingle =
                      isSingleMode && singleVariantId === variant.id;

                    const isChecked = isSingleMode ? isSelectedInSingle : true;
                    const currentQty = isSingleMode
                      ? isSelectedInSingle
                        ? singleQuantity
                        : 1
                      : bothQuantities[variant.id] || 1;

                    return (
                      <div
                        key={variant.id}
                        onClick={() => {
                          if (isSingleMode && !isSelectedInSingle) {
                            setSingleVariantId(variant.id);
                            setSingleQuantity(1);
                          }
                        }}
                        className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 transition gap-4 ${
                          isSingleMode ? "cursor-pointer" : ""
                        } ${
                          isChecked
                            ? "bg-emerald-50/60 dark:bg-slate-800/90 border-l-4 border-brand-green shadow-sm"
                            : "hover:bg-slate-100 dark:hover:bg-slate-800/50"
                        }`}
                      >
                        <div className="flex items-center gap-3 sm:gap-4 flex-1">
                          <input
                            type="radio"
                            name={
                              isSingleMode
                                ? "quickOrderVariant"
                                : `quickOrderVariant_${variant.id}`
                            }
                            checked={isChecked}
                            onChange={() => {
                              if (isSingleMode) {
                                setSingleVariantId(variant.id);
                                setSingleQuantity(1);
                              }
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
                                `${mainProduct.name} ${variant.title}`,
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
                              disabled={isSingleMode && !isSelectedInSingle}
                              onClick={() => {
                                if (isSingleMode) {
                                  handleSingleQuantityChange(variant.id, -1);
                                } else {
                                  handleBothQuantityChange(variant.id, -1);
                                }
                              }}
                              className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-slate-700 dark:text-slate-200 text-sm transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 font-bold text-sm min-w-8 text-center text-slate-900 dark:text-white select-none">
                              {currentQty}
                            </span>
                            <button
                              type="button"
                              disabled={isSingleMode && !isSelectedInSingle}
                              onClick={() => {
                                if (isSingleMode) {
                                  handleSingleQuantityChange(variant.id, 1);
                                } else {
                                  handleBothQuantityChange(variant.id, 1);
                                }
                              }}
                              className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-slate-700 dark:text-slate-200 text-sm transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:border-brand-green dark:text-white"
                  />

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
                      handleInputChange("address", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:border-brand-green dark:text-white"
                  />

                  <textarea
                    rows={3}
                    placeholder="আপনার বিশেষ কোনো মতামত বা নির্দেশনা থাকলে লিখুন (ঐচ্ছিক)"
                    value={formData.note}
                    onChange={(e) => handleInputChange("note", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:border-brand-green dark:text-white resize-none"
                  ></textarea>
                </div>
              </div>

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
                    {selectedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-xs font-medium py-1"
                      >
                        <span className="text-slate-800 dark:text-slate-200 pr-2">
                          {truncateText(mainProduct.name, 25)} ({item.title}) ×{" "}
                          {item.quantity}
                        </span>
                        <span className="font-bold whitespace-nowrap">
                          {item.totalPrice}.00৳
                        </span>
                      </div>
                    ))}
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

                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                      অথবা সরাসরি কথা বলে অর্ডার করতে
                    </p>
                    <a
                      href={whatsappUrl}
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
