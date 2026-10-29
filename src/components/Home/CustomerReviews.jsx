import { useState, useRef, useEffect } from "react";
import {
  IconStar,
  IconLeaf,
  IconFlask,
  IconAward,
  IconCheck,
  IconChecklist,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { reviewsSectionData } from "../../data/reviews";
import { SectionNameBadge } from "../UI/Badges";

const CustomerReviews = () => {
  const { sectionTitle, reviews, trustBadges } = reviewsSectionData;

  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Intersection Observer দিয়ে চেক করা সেকশনটি স্ক্রিনে আছে কি না
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }, // সেকশনের অন্তত ৩০% দৃশ্যমান হলে একটিভ হবে
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // ৪টি ট্রাস্ট ব্যাজের জন্য নির্দিষ্ট আইকন
  const badgeIcons = [
    <IconCheck key="1" className="w-5 h-5 text-brand-green" />,
    <IconLeaf key="2" className="w-5 h-5 text-brand-green" />,
    <IconFlask key="3" className="w-5 h-5 text-brand-green" />,
    <IconAward key="4" className="w-5 h-5 text-brand-green" />,
  ];

  // ম্যানুয়াল নেভিগেশন হ্যান্ডলার
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // অটো-স্লাইড ইফেক্ট (সেকশন ভিউতে থাকলে এবং মাউস হোভার না করা হলে চলবে)
  useEffect(() => {
    if (!isInView || isHovered) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 5) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollContainerRef.current.scrollBy({
            left: 320,
            behavior: "smooth",
          });
        }
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [isInView, isHovered]);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="py-16 bg-white dark:bg-[#0B1322] border-y border-slate-200 dark:border-brand-slate-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionNameBadge badgeTitle={sectionTitle.badge} />
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-3">
            {sectionTitle.heading}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            {sectionTitle.subHeading}
          </p>
        </div>

        {/* Dynamic Reviews Cards with Scroll & Navigators */}
        <div
          className="relative group mb-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          {/* Left Navigator Button (<) */}
          <button
            onClick={() => handleScroll("left")}
            aria-label="Previous"
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-brand-green hover:text-white transition-all opacity-80 group-hover:opacity-100"
          >
            <IconChevronLeft size={20} />
          </button>

          {/* Right Navigator Button (>) */}
          <button
            onClick={() => handleScroll("right")}
            aria-label="Next"
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-brand-green hover:text-white transition-all opacity-80 group-hover:opacity-100"
          >
            <IconChevronRight size={20} />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto overflow-y-hidden snap-x snap-mandatory py-2 px-1 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="min-w-70 sm:min-w-85 md:min-w-90 flex-1 snap-start p-6 rounded-2xl bg-slate-50 dark:bg-brand-slate-card border border-slate-200 dark:border-brand-slate-border flex flex-col justify-between"
              >
                <div>
                  {/* Star Rating */}
                  <div className="flex text-amber-400 gap-0.5 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <IconStar
                        key={i}
                        className="w-5 h-5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-sm text-slate-700 dark:text-slate-200 italic leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>

                {/* Author Details */}
                <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-teal text-white flex items-center justify-center text-xs font-bold">
                      {review.author.initials}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">
                        {review.author.name}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {review.author.location}
                      </span>
                    </div>
                  </div>

                  {review.author.isVerified && (
                    <span className="text-[11px] text-brand-green font-semibold flex items-center gap-1">
                      <IconChecklist className="w-4 h-4 text-brand-green" />
                      ভেরিফাইড ক্রেতা
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Trust Badges & Quality Compliance */}
        <div className="p-4 sm:p-6 rounded-2xl bg-brand-teal/5 dark:bg-slate-800/60 border border-brand-teal/20 flex flex-wrap items-center justify-around gap-6 text-center">
          {trustBadges.map((badge, index) => (
            <div
              key={badge.id}
              className="flex items-center gap-2 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold"
            >
              {badgeIcons[index]}
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
