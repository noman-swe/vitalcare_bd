import { whyVitalCareData } from "../../data/WhyVitalCare";

const WhyVitalCare = () => {
  const { header, benefits, ingredients } = whyVitalCareData;

  return (
    <section
      id="benefits"
      className="py-16 bg-slate-50 dark:bg-brand-slate border-y border-slate-200 dark:border-brand-slate-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* হেডার সেকশন */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-brand-teal dark:text-brand-green font-bold bg-brand-teal/10 dark:bg-brand-green/10 px-3 py-1 rounded-full">
            {header.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mt-3">
            {header.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            {header.description}
          </p>
        </div>

        {/* স্বাস্থ্য উপকারিতার কার্ডসমূহ (ডায়নামিক) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* {benefits.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-brand-slate-border"
            >
              <div
                className={`w-12 h-12 rounded-xl ${item.bgColor} ${item.textColor} flex items-center justify-center mb-4`}
              >
                <span className="material-symbols-outlined text-2xl">
                  {item.icon}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))} */}
          {/* বেনিফিট কার্ড রেন্ডারিং */}
          {benefits.map((item) => {
            const BenefitIcon = item.Icon;
            return (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-brand-slate-card border border-slate-200 dark:border-brand-slate-border"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${item.bgColor} ${item.textColor} flex items-center justify-center mb-4`}
                >
                  <BenefitIcon size={24} stroke={2} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}

          {/* ইনগ্রেডিয়েন্ট হেডার আইকন */}
          {/* <IngredientIcon size={24} stroke={2} className="text-brand-green" /> */}
        </div>

        {/* উপাদান সমূহের সেকশন (ডায়নামিক) */}
        <div className="bg-slate-50 dark:bg-brand-slate-card rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-brand-slate-border">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-brand-green">
              {ingredients.icon}
            </span>
            {ingredients.title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ingredients.items.map((ingredient) => (
              <div
                key={ingredient.id}
                className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              >
                <strong className="text-sm text-brand-teal dark:text-brand-green block">
                  {ingredient.name}
                </strong>
                <span className="text-xs text-slate-600 dark:text-slate-300">
                  {ingredient.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyVitalCare;
