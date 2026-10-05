// import { useState } from "react";
// Multi-product mode active korle niche Cart Context import un-comment korun:
// import { useCart } from "../../context/CartContext";

import { LockIcon, PhoneIcon } from "../../icons/Icons";
// Multi-product mode active korle ShoppingCartIcon o import korun:
// import { ShoppingCartIcon } from "../../icons/Icons";

export const FocusProduct = () => {
  // const [quantity, setQuantity] = useState(1);
  // const { addToCart } = useCart(); // Multi-product mode er jonno

  const focusProductItem = {
    id: "macca-coffee",
    name: "ম্যাকা কফি (Macca Coffee)",
    price: 1250,
    originalPrice: 1600,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_BQLbKiee4AjaFEpuqYT1xjHlJZ8Nin9oukyw7ZtFbwnLrjDWBaj2zLAGZQN-n5pDXSCDOddBq8NZ7X7Sj74_Tv_Cno4NoaeHYS8dXRIv60KHlc-zJ_k-LKtyKQ3VgBrYKnrIOIrNID3JFqIoVG0snYTuJWvNRey5fJkafedaS9N4E1bBbEVgi7an0SrmHyu_c2BVXVARKjSv-rQVQXt8ro9-5WtCRHBxgxkJ25jAwbImpGgDteNP",
  };

  /* 
  // Cart-e add korar handler (Single Product mode-e dorkar nei)
  const handleAddToCart = () => {
    addToCart(focusProductItem, quantity);
  };
  */

  return (
    <section
      id="focus-product"
      className="py-16 lg:py-24 bg-slate-50 dark:bg-brand-slate"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <img
                  src={focusProductItem.image}
                  alt="Macca Coffee Main Pack"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-brand-green text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow">
                  সর্বাধিক বিক্রিত
                </div>
              </div>
            </div>

            {/* Details Column */}
            <div className="lg:col-span-6 flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-teal/10 dark:bg-brand-teal/30 text-brand-teal dark:text-brand-green text-xs font-bold uppercase tracking-wider w-fit">
                VitalCareBD Official Premium Series
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                অর্গানিক ম্যাকা কফি (Macca Herbal Vitality Booster)
              </h2>

              <div className="flex items-center gap-3">
                <div className="flex text-amber-400 text-sm font-bold">
                  ★ ★ ★ ★ ★
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  ৫.০ (৭৮০+ ভেরিফায়েড রিভিউ)
                </span>
              </div>

              {/* <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-brand-teal dark:text-brand-green">
                  ৳১,২৫০
                </span>
                <span className="text-lg text-slate-400 line-through">
                  ৳১,৬০০
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-500 text-xs font-bold">
                  ২২% সাশ্রয়
                </span>
              </div> */}

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                পেরুভিয়ান ব্ল্যাক ম্যাকা রুট, লাল জিনসেং ও প্রিমিয়াম
                অ্যারাবিকা কফির মেলবন্ধনে তৈরি। সম্পূর্ণ স্টেরয়েডমুক্ত এই
                প্রাকৃতিক ব্লেন্ড শরীরের স্বাভাবিক হরমোন ও শক্তি পুনরুজ্জীবিত
                করতে কার্যকর।
              </p>

              {/* CONVERSION ACTION BUTTONS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {/* 1. Add to Cart (Multiple products er jonno comment kora holo) */}
                {/* 
                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-brand-green hover:bg-green-600 text-slate-950 font-bold text-sm sm:text-base transition cursor-pointer shadow-md"
                >
                  <ShoppingCartIcon size={20} />
                  <span>কার্টে যোগ করুন</span>
                </button>
                */}

                {/* 2. Direct Buy / Scroll to Checkout */}
                <a
                  href="#checkout-section"
                  className="sm:col-span-2 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-brand-teal hover:bg-brand-teal-light text-white font-bold text-base transition shadow-md text-center"
                >
                  <span>⚡ সরাসরি অর্ডার করুন</span>
                </a>

                {/* 3. WhatsApp Order */}
                <a
                  href="https://wa.me/+8801778155184?text=হ্যালো%VitalCareBD,%20আমি%20ম্যাকা%20কফি%20অর্ডার%20করতে%20চাই"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm sm:text-base transition shadow-md"
                >
                  <PhoneIcon size={20} />
                  <span>হোয়াটসঅ্যাপে অর্ডার</span>
                </a>

                {/* 4. Call For Order */}
                <a
                  href="tel:01778155184"
                  className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base transition shadow-md"
                >
                  <PhoneIcon size={20} />
                  <span>কল করুন: ০১৭৭৮-১৫৫১৮৪</span>
                </a>
              </div>

              {/* Privacy Note */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 mt-2">
                <LockIcon size={18} />
                <p>
                  <strong>১০০% গোপনীয়তার নিশ্চয়তা:</strong> আপনার পার্সেলটির
                  বাইরে কোনো পণ্যের নাম লেখা থাকবে না। সম্পূর্ণ সিলগালা
                  আনমার্কেড বক্সে ডেলিভারিম্যান আপনার হাতে পৌঁছে দেবে।
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
