import { trustBadgesData } from "../../data/TrustBadges";

const TrustBadges = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* {trustBadgesData.map((badge) => (
            <div
              key={badge.id}
              className="p-6 rounded-2xl bg-white dark:bg-brand-slate-card border border-slate-200 dark:border-brand-slate-border text-center flex flex-col items-center"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${badge.bgColor} ${badge.textColor} flex items-center justify-center mb-3`}
              >
                <span className="material-symbols-outlined text-3xl">
                  {badge.icon}
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {badge.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                {badge.description}
              </p>
            </div>
          ))} */}

          {/* ট্রাস্ট ব্যাজ কার্ড রেন্ডারিং */}
          {trustBadgesData.map((badge) => {
            const BadgeIcon = badge.Icon;
            return (
              <div
                key={badge.id}
                className="p-6 rounded-2xl bg-white dark:bg-brand-slate-card border border-slate-200 dark:border-brand-slate-border text-center flex flex-col items-center"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${badge.bgColor} ${badge.textColor} flex items-center justify-center mb-3`}
                >
                  <BadgeIcon size={28} stroke={2} />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {badge.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
