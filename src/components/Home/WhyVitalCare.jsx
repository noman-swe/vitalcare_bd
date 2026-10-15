import { useState, useRef, useEffect } from "react";
import { whyVitalCareData } from "../../data/WhyVitalCare";
import { SectionNameBadge } from "../UI/Badges";
import { ScrollButtons } from "../UI/ScrollButtons";

// Sub-component for individual benefit card
const BenefitCard = ({ item }) => {
  const BenefitIcon = item.Icon;
  return (
    <div className="min-w-70 sm:min-w-75 md:min-w-full snap-start p-6 rounded-2xl bg-slate-50 dark:bg-brand-slate-card border border-slate-200 dark:border-brand-slate-border flex flex-col justify-between">
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
};

// Sub-component for individual ingredient card
const IngredientCard = ({ ingredient }) => (
  <div className="min-w-65 sm:min-w-full snap-start p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
    <strong className="text-sm text-brand-teal dark:text-brand-green block">
      {ingredient.name}
    </strong>
    <span className="text-xs text-slate-600 dark:text-slate-300">
      {ingredient.description}
    </span>
  </div>
);

const WhyVitalCare = () => {
  const { header, benefits, ingredients } = whyVitalCareData;

  // States for Section and Scroll Tracking
  const [isInView, setIsInView] = useState(false);
  const [isBenefitsHovered, setIsBenefitsHovered] = useState(false);
  const [isIngredientsHovered, setIsIngredientsHovered] = useState(false);

  const sectionRef = useRef(null);
  const benefitsScrollRef = useRef(null);
  const ingredientsScrollRef = useRef(null);

  // Intersection Observer to detect if the section is active/visible on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

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
    if (!isInView || isBenefitsHovered) return;

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
  }, [isInView, isBenefitsHovered]);

  // Auto Scroll Effect for Ingredients
  useEffect(() => {
    if (!isInView || isIngredientsHovered) return;

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
    }, 2000);

    return () => clearInterval(interval);
  }, [isInView, isIngredientsHovered]);

  return (
    <section
      ref={sectionRef}
      id="benefits"
      className="py-16 bg-slate-50 dark:bg-brand-slate border-y border-slate-200 dark:border-brand-slate-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionNameBadge badgeTitle={header.badge} />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mt-3">
            {header.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            {header.description}
          </p>
        </div>

        {/* Benefits Section */}
        <div
          className="relative group mb-12"
          onMouseEnter={() => setIsBenefitsHovered(true)}
          onMouseLeave={() => setIsBenefitsHovered(false)}
          onTouchStart={() => setIsBenefitsHovered(true)}
          onTouchEnd={() => setIsBenefitsHovered(false)}
        >
          <ScrollButtons
            scrollRef={benefitsScrollRef}
            onScroll={handleScroll}
          />

          <div
            ref={benefitsScrollRef}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible overflow-y-hidden snap-x snap-mandatory py-2 px-1 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {benefits.map((item) => (
              <BenefitCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Ingredients Section */}
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
            <ScrollButtons
              scrollRef={ingredientsScrollRef}
              onScroll={handleScroll}
            />

            <div
              ref={ingredientsScrollRef}
              className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto sm:overflow-visible overflow-y-hidden snap-x snap-mandatory py-2 px-1 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {ingredients.items.map((ingredient) => (
                <IngredientCard key={ingredient.id} ingredient={ingredient} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyVitalCare;
