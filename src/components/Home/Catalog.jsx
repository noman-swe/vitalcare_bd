import { ShoppingCartIcon } from "../../icons/Icons";

// Product Data with Demo Images
const productsData = [
  {
    id: "macca-coffee",
    name: "ম্যাকা কফি (Macca Coffee)",
    price: 1250,
    originalPrice: 1600,
    badge: "২২% ছাড়",
    category: "বেস্টসেলার #১",
    description:
      "প্রাকৃতিক শারীরিক এনার্জি, দীর্ঘস্থায়ী স্ট্যামিনা ও ক্লান্তিহীন সতেজতার জন্য পেরুভিয়ান ব্ল্যাক ম্যাকা মিশ্রিত প্রিমিয়াম কফি।",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_BQLbKiee4AjaFEpuqYT1xjHlJZ8Nin9oukyw7ZtFbwnLrjDWBaj2zLAGZQN-n5pDXSCDOddBq8NZ7X7Sj74_Tv_Cno4NoaeHYS8dXRIv60KHlc-zJ_k-LKtyKQ3VgBrYKnrIOIrNID3JFqIoVG0snYTuJWvNRey5fJkafedaS9N4E1bBbEVgi7an0SrmHyu_c2BVXVARKjSv-rQVQXt8ro9-5WtCRHBxgxkJ25jAwbImpGgDteNP",
    isFeaturedLarge: false,
  },
  {
    id: "macca-tea",
    name: "ম্যাকা টি (Macca Herbal Tea)",
    price: 950,
    originalPrice: 1200,
    badge: "২১% ছাড়",
    category: "হারবাল ইনফিউশন",
    description:
      "মানসিক ক্লান্তি ও স্ট্রেস কমিয়ে গভীর প্রশান্তি এবং প্রাকৃতিক স্নায়বিক শক্তি বজায় রাখতে অনন্য হার্বাল গ্রিন টি ও ম্যাকা নির্যাস।",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXaVGPSgqWcQlBfXD5-TC7Dys_ABEKxj3Wg5jnZGQDNJ2ddAPRI7bBPg4&s=10",
    isFeaturedLarge: false,
  },
  {
    id: "pure-honey",
    name: "খাঁটি মধু (Sundarbans Wild Pure Honey)",
    price: 1500,
    originalPrice: 1850,
    badge: "১৯% ছাড়",
    category: "১০০% প্রাকৃতিক",
    description:
      "সুন্দরবনের গভীর অরণ্যের চাকের কাঁচা মধু। শক্তিশালী অ্যান্টি-অক্সিডেন্ট ও এনজাইম সমৃদ্ধ যা তাৎক্ষণিক শক্তি ও জীবনীশক্তি জোগায়।",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSub7pnGUlobsPVhASjjA7AXvF1aJh7_vB2keVwG5fDtLW-pYDVvRJgmMy_&s=10",
    isFeaturedLarge: false,
  },
  {
    id: "booster-milk",
    name: "বুস্টার মিল্ক (Herbal Booster Milk)",
    price: 1800,
    originalPrice: 2200,
    badge: "১৮% ছাড়",
    category: "পুষ্টি ও শক্তি বর্ধক",
    description:
      "খাঁটি জাফরান, কাজু-পেস্তা বাদাম ও অশ্বগন্ধা মিশ্রিত স্পেশাল পুষ্টিকর ড্রিংক। গভীর সেলুলার শক্তি ও শারীরিক সক্ষমতা বৃদ্ধি করে।",
    image:
      "https://supermamalab.store/cdn/shop/files/SLP_Matcha_Box_1.jpg?v=1773049294&width=2700",
    isFeaturedLarge: false,
  },
  {
    id: "booster-tissue",
    name: "বুস্টার টিস্যু (VitalCare Intimate Booster Wipe)",
    price: 450,
    originalPrice: 600,
    badge: "২৫% ছাড়",
    category: "হাইজিন ও কেয়ার",
    description:
      "স্পর্শকাতর অংশের পূর্ণাঙ্গ স্বাস্থ্যবিধি, রিফ্রেশমেন্ট ও প্রাকৃতিক জীবাণু সুরক্ষার জন্য তৈরি অ্যালকোহলমুক্ত অ্যালোভেরা সমৃদ্ধ ব্যক্তিগত টিস্যু।",
    image:
      "https://static-01.daraz.com.bd/p/d7aa87851d4cb274cd069f11d7d097fd.jpg",
    isFeaturedLarge: true,
  },
];

export const Catalog = () => {
  const handleQuickOrder = (product) => {
    console.log("Quick order clicked for:", product.name);
  };

  return (
    <section
      id="catalog"
      className="py-16 bg-white dark:bg-[#0B1322] border-y border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-brand-green font-bold bg-brand-green/10 px-3 py-1 rounded-full">
            নির্বাচিত ফর্মুলেশন
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mt-3">
            VitalCareBD-এর প্রিমিয়াম ৫টি প্রোডাক্ট ক্যাটালগ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsData.map((product) => (
            <div
              key={product.id}
              className={`bg-slate-50 dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 flex flex-col justify-between hover:border-brand-green transition ${
                product.isFeaturedLarge ? "lg:col-span-2" : ""
              }`}
            >
              {product.isFeaturedLarge ? (
                // Layout for Large Featured Items
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center h-full">
                  <div className="relative w-full h-52 rounded-xl overflow-hidden bg-slate-900">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <span className="text-xs text-brand-teal dark:text-brand-green font-bold uppercase">
                        {product.category}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                        {product.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-5 mt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                      <div>
                        <div className="text-xl font-extrabold text-brand-teal dark:text-brand-green">
                          ৳{product.price}
                        </div>
                        <div className="text-xs text-slate-400 line-through">
                          ৳{product.originalPrice}
                        </div>
                      </div>
                      <button
                        onClick={() => handleQuickOrder(product)}
                        className="px-4 py-2 rounded-xl bg-brand-teal hover:bg-brand-green text-white hover:text-slate-950 font-bold text-xs sm:text-sm transition flex items-center gap-1.5"
                      >
                        <ShoppingCartIcon size={16} />
                        <span>কুইক অর্ডার ☀️</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Standard Layout for Normal Items
                <>
                  <div>
                    <div className="relative w-full h-52 rounded-xl overflow-hidden bg-slate-900 mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {product.badge && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-brand-teal dark:text-brand-green font-bold uppercase">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <div className="text-xl font-extrabold text-brand-teal dark:text-brand-green">
                        ৳{product.price}
                      </div>
                      <div className="text-xs text-slate-400 line-through">
                        ৳{product.originalPrice}
                      </div>
                    </div>
                    <button
                      onClick={() => handleQuickOrder(product)}
                      className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-1.5 ${
                        product.id === "macca-coffee"
                          ? "bg-brand-green hover:bg-green-600 text-slate-950"
                          : "bg-brand-teal hover:bg-brand-green text-white hover:text-slate-950"
                      }`}
                    >
                      <ShoppingCartIcon size={16} />
                      <span>কুইক অর্ডার</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
