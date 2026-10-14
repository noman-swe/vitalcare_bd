import { useState, useRef, useEffect } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { whyVitalCareData } from "../../data/WhyVitalCare";
import { SectionNameBadge } from "../UI/Badges";

const WhyVitalCare = () => {
  const { header, benefits, ingredients } = whyVitalCareData;

  // Benefits Scroll States
  const [isBenefitsHovered, setIsBenefitsHovered] = useState(false);
  const benefitsScrollRef = useRef(null);

  // Ingredients Scroll States
  const [isIngredientsHovered, setIsIngredientsHovered] = useState(false);
  const ingredientsScrollRef = useRef(null);

  // Manual Scroll Handlers
  const handleScroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      ref.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Auto Scroll Effect for Benefits
  useEffect(() => {
    if (!isBenefitsHovered) return;
    const interval = setInterval(() => {
      if (benefitsScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          benefitsScrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 5) {
          benefitsScrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          benefitsScrollRef.current.scrollBy({ left: 280, behavior: "smooth" });
        }
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [isBenefitsHovered]);

  // Auto Scroll Effect for Ingredients
  useEffect(() => {
    if (!isIngredientsHovered) return;
    const interval = setInterval(() => {
      if (ingredientsScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          ingredientsScrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 5) {
          ingredientsScrollRef.current.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        } else {
          ingredientsScrollRef.current.scrollBy({
            left: 280,
            behavior: "smooth",
          });
        }
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [isIngredientsHovered]);

  return (
    <section
      id="benefits"
      className="py-16 bg-slate-50 dark:bg-brand-slate border-y border-slate-200 dark:border-brand-slate-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* হেডার সেকশন */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionNameBadge badgeTitle={header.badge} />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mt-3">
            {header.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            {header.description}
          </p>
        </div>

        {/* স্বাস্থ্য উপকারিতার কার্ডসমূহ (Mobile: Horizontal Scroll with Navigators | Desktop: Grid) */}
        <div
          className="relative group mb-12"
          onMouseEnter={() => setIsBenefitsHovered(true)}
          onMouseLeave={() => setIsBenefitsHovered(false)}
          onTouchStart={() => setIsBenefitsHovered(true)}
          onTouchEnd={() => setIsBenefitsHovered(false)}
        >
          {/* Left Button (<) - Mobile Only */}
          <button
            onClick={() => handleScroll(benefitsScrollRef, "left")}
            aria-label="Previous"
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-brand-green hover:text-white transition-all opacity-80 group-hover:opacity-100 sm:hidden"
          >
            <IconChevronLeft size={20} />
          </button>

          {/* Right Button (>) - Mobile Only */}
          <button
            onClick={() => handleScroll(benefitsScrollRef, "right")}
            aria-label="Next"
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-brand-green hover:text-white transition-all opacity-80 group-hover:opacity-100 sm:hidden"
          >
            <IconChevronRight size={20} />
          </button>

          <div
            ref={benefitsScrollRef}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible overflow-y-hidden snap-x snap-mandatory py-2 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {benefits.map((item) => {
              const BenefitIcon = item.Icon;
              return (
                <div
                  key={item.id}
                  className="min-w-[280px] sm:min-w-[300px] md:min-w-full snap-start p-6 rounded-2xl bg-slate-50 dark:bg-brand-slate-card border border-slate-200 dark:border-brand-slate-border flex flex-col justify-between"
                >
                  <div>
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
                </div>
              );
            })}
          </div>
        </div>

        {/* উপাদান সমূহের সেকশন (Mobile: Horizontal Scroll with Navigators | Desktop: Grid) */}
        <div className="bg-slate-50 dark:bg-brand-slate-card rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-brand-slate-border">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-brand-green">
              {ingredients.icon}
            </span>
            {ingredients.title}
          </h3>

          <div
            className="relative group"
            onMouseEnter={() => setIsIngredientsHovered(true)}
            onMouseLeave={() => setIsIngredientsHovered(false)}
            onTouchStart={() => setIsIngredientsHovered(true)}
            onTouchEnd={() => setIsIngredientsHovered(false)}
          >
            {/* Left Button (<) - Mobile Only */}
            <button
              onClick={() => handleScroll(ingredientsScrollRef, "left")}
              aria-label="Previous"
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-brand-green hover:text-white transition-all opacity-80 group-hover:opacity-100 sm:hidden"
            >
              <IconChevronLeft size={20} />
            </button>

            {/* Right Button (>) - Mobile Only */}
            <button
              onClick={() => handleScroll(ingredientsScrollRef, "right")}
              aria-label="Next"
              className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-brand-green hover:text-white transition-all opacity-80 group-hover:opacity-100 sm:hidden"
            >
              <IconChevronRight size={20} />
            </button>

            <div
              ref={ingredientsScrollRef}
              className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto sm:overflow-visible overflow-y-hidden snap-x snap-mandatory py-2 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {ingredients.items.map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="min-w-[260px] sm:min-w-full snap-start p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
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
      </div>
    </section>
  );
};

export default WhyVitalCare;
