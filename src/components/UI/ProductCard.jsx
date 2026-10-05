import { ShoppingCartIcon } from "../../icons/Icons";

export const ProductCard = ({ product, onAddToCart, onQuickOrder }) => {
  return (
    <div
      className={`bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between hover:border-brand-green transition duration-300 ${
        product.isFeaturedLarge ? "lg:col-span-2" : ""
      }`}
    >
      {product.isFeaturedLarge ? (
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

            <div className="pt-5 mt-4 border-t border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <div className="text-xl font-extrabold text-brand-teal dark:text-brand-green">
                  ৳{product.price}
                </div>
                {product.originalPrice && (
                  <div className="text-xs text-slate-400 line-through">
                    ৳{product.originalPrice}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => onAddToCart(product)}
                  className="flex-1 sm:flex-initial px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-bold text-xs transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ShoppingCartIcon size={15} />
                  <span>কার্ট</span>
                </button>
                <button
                  onClick={() => onQuickOrder(product)}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-brand-green hover:bg-green-600 text-slate-950 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>কুইক অর্ডার</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
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

          <div className="pt-5 mt-4 border-t border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <div className="text-xl font-extrabold text-brand-teal dark:text-brand-green">
                ৳{product.price}
              </div>
              {product.originalPrice && (
                <div className="text-xs text-slate-400 line-through">
                  ৳{product.originalPrice}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => onAddToCart(product)}
                className="flex-1 sm:flex-initial px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-bold text-xs transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <ShoppingCartIcon size={15} />
                <span>কার্ট</span>
              </button>
              <button
                onClick={() => onQuickOrder(product)}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-brand-green hover:bg-green-600 text-slate-950 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>কুইক অর্ডার</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
