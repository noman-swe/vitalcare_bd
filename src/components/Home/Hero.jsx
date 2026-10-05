import { ShoppingCartIcon, SpaIcon } from "../../icons/Icons";

// হিরো সেকশনের সমস্ত স্ট্যাটিক ডেটার কনফিগারেশন
const heroData = {
  topBadgeText: "১০০% প্রাকৃতিক ও প্রিমিয়াম কোয়ালিটি অর্গানিক প্রোডাক্ট",
  headline: {
    prefix: "প্রাকৃতিক শক্তিতে জীবনের স্বাভাবিক",
    highlight: "উদ্যম ও প্রাণশক্তি",
    suffix: "ফিরিয়ে আনুন",
  },
  description:
    "VitalCare BD নিয়ে এসেছে সম্পূর্ণ প্রাকৃতিক উপাদানে তৈরি বিশ্বস্ত ওয়েলনেস সমাধান। কোনো রকম সাইড ইফেক্ট ছাড়াই আপনার দৈনন্দিন ফিটনেস ও স্ট্যামিনা নিশ্চিত করুন।",
  ctaButtons: [
    {
      text: "অর্ডার করুন",
      href: "#checkout-section",
      primary: true,
      icon: <ShoppingCartIcon size={20} />,
    },
    {
      text: "বিস্তারিত দেখুন",
      href: "#focus-product",
      primary: false,
    },
  ],
  trustBadges: [
    { value: "১০০%", label: "অর্গানিক উপাদান" },
    { value: "৫০০০+", label: "সন্তুষ্ট গ্রাহক" },
    { value: "২৪/৭", label: "কাস্টমার সাপোর্ট" },
  ],
  imageSection: {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_BQLbKiee4AjaFEpuqYT1xjHlJZ8Nin9oukyw7ZtFbwnLrjDWBaj2zLAGZQN-n5pDXSCDOddBq8NZ7X7Sj74_Tv_Cno4NoaeHYS8dXRIv60KHlc-zJ_k-LKtyKQ3VgBrYKnrIOIrNID3JFqIoVG0snYTuJWvNRey5fJkafedaS9N4E1bBbEVgi7an0SrmHyu_c2BVXVARKjSv-rQVQXt8ro9-5WtCRHBxgxkJ25jAwbImpGgDteNP",
    alt: "VitalCareBD Macca Coffee Luxury Packaging",
    offerCard: {
      tag: "স্পেশাল অফার",
      title: "ম্যাকা কফি (Macca Coffee)",
      discount: "২৫% ছাড়",
    },
  },
};

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28"
    >
      {/* Decorative Glow Background Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-brand-green/10 dark:bg-brand-green/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-75 h-75 bg-brand-teal/15 dark:bg-brand-teal/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & Call to Actions */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal/10 dark:bg-brand-teal/30 border border-brand-teal/20 dark:border-brand-teal/50 text-brand-teal dark:text-brand-green text-xs sm:text-sm font-semibold mb-6">
              <SpaIcon size={16} />
              <span>{heroData.topBadgeText}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2] sm:leading-[1.3]">
              {heroData.headline.prefix}{" "}
              <span className="text-brand-teal dark:text-brand-green">
                {heroData.headline.highlight}
              </span>{" "}
              {heroData.headline.suffix}
            </h1>

            {/* Subtitle / Description */}
            <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {heroData.description}
            </p>

            {/* CTA Buttons - Dynamically Mapped */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {heroData.ctaButtons.map((btn, index) => (
                <a
                  key={index}
                  href={btn.href}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base transition ${
                    btn.primary
                      ? "bg-brand-green hover:bg-green-600 text-slate-950 font-bold shadow-lg shadow-green-500/20"
                      : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {btn.icon && btn.icon}
                  <span>{btn.text}</span>
                </a>
              ))}
            </div>

            {/* Feature Highlights / Trust Badges - Dynamically Mapped */}
            <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
              {heroData.trustBadges.map((badge, index) => (
                <div key={index}>
                  <p className="text-xl sm:text-2xl font-bold text-brand-teal dark:text-brand-green">
                    {badge.value}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    {badge.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Image / Visual Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Image Container with Styling */}
              <div className="relative rounded-2xl overflow-hidden bg-linear-to-tr from-[#0D4B63] to-brand-green p-1 shadow-2xl">
                <div className="bg-slate-900 rounded-[14px] overflow-hidden aspect-4/5 relative flex items-center justify-center">
                  <img
                    src={heroData.imageSection.src}
                    alt={heroData.imageSection.alt}
                    className="w-full h-full object-cover rounded-2xl transform transition hover:scale-105 duration-500"
                  />
                  {/* Floating Highlight Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">
                        {heroData.imageSection.offerCard.tag}
                      </p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {heroData.imageSection.offerCard.title}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-brand-green/10 text-brand-green font-bold text-xs rounded-full">
                      {heroData.imageSection.offerCard.discount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
