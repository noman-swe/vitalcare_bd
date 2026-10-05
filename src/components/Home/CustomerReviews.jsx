import {
  IconStar,
  IconLeaf,
  IconFlask,
  IconAward,
  IconCheck,
  IconChecklist,
} from "@tabler/icons-react";
import { reviewsSectionData } from "../../data/reviews";

const CustomerReviews = () => {
  const { sectionTitle, reviews, trustBadges } = reviewsSectionData;

  // ৪টি ট্রাস্ট ব্যাজের জন্য নির্দিষ্ট আইকন
  const badgeIcons = [
    <IconCheck key="1" className="w-5 h-5 text-brand-green" />,
    <IconLeaf key="2" className="w-5 h-5 text-brand-green" />,
    <IconFlask key="3" className="w-5 h-5 text-brand-green" />,
    <IconAward key="4" className="w-5 h-5 text-brand-green" />,
  ];

  return (
    <section
      id="reviews"
      className="py-16 bg-white dark:bg-[#0B1322] border-y border-slate-200 dark:border-brand-slate-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-brand-green font-bold bg-brand-green/10 px-3 py-1 rounded-full">
            {sectionTitle.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-3">
            {sectionTitle.heading}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            {sectionTitle.subHeading}
          </p>
        </div>

        {/* Dynamic Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-brand-slate-card border border-slate-200 dark:border-brand-slate-border flex flex-col justify-between"
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
