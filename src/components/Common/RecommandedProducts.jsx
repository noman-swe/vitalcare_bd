import { IconTag, IconPlus } from "@tabler/icons-react";
import { comboOffersData } from "../../data/recommanded";

const RecommendedProducts = ({ onAddToCart }) => {
  const { header, products } = comboOffersData;

  const handleAddToCart = (productName, price) => {
    // অনক্লিক ফাংশন বা প্রপস থেকে আসা হ্যান্ডলারকে কল করবে
    if (onAddToCart) {
      onAddToCart(productName, price);
    } else if (typeof window !== "undefined" && window.addToCartLive) {
      window.addToCartLive(productName, price);
    } else {
      console.log(`Added to cart: ${productName} - ৳${price}`);
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-teal dark:text-brand-green font-bold">
              {header.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              {header.title}
            </h2>
          </div>

          {/* Free Delivery Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-green/20 text-brand-green-dark dark:text-brand-green text-xs font-bold w-fit">
            <IconTag className="w-4 h-4" />
            {header.offerNotice}
          </div>
        </div>

        {/* Dynamic Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-5 rounded-2xl bg-white dark:bg-brand-slate-card border border-slate-200 dark:border-brand-slate-border flex flex-col justify-between"
            >
              <div>
                <span className="text-xs text-brand-green font-bold uppercase">
                  {product.category}
                </span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  {product.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price & Add to Cart Action */}
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <span className="text-base font-extrabold text-brand-teal dark:text-brand-green">
                  ৳{product.price.toLocaleString("bn-BD")}
                </span>
                <button
                  onClick={() =>
                    handleAddToCart(product.cartName, product.price)
                  }
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-teal hover:bg-brand-green text-white hover:text-slate-950 font-bold text-xs transition"
                >
                  <IconPlus className="w-3.5 h-3.5" />
                  কার্টে যোগ করুন
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedProducts;
