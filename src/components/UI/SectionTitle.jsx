export const SectionTitle = ({ tag, title, subtitle }) => (
  <div className="text-center max-w-3xl mx-auto mb-12">
    {tag && (
      <span className="text-xs uppercase tracking-widest text-brand-green font-bold bg-brand-green/10 px-3 py-1 rounded-full">
        {tag}
      </span>
    )}
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mt-3">
      {title}
    </h2>
    {subtitle && (
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
        {subtitle}
      </p>
    )}
  </div>
);
