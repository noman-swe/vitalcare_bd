export const Badge = ({ children, variant = "green" }) => {
  const styles =
    variant === "red"
      ? "bg-red-500 text-white"
      : "bg-brand-green/10 text-brand-green";
  return (
    <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${styles}`}>
      {children}
    </span>
  );
};
export const SectionNameBadge = ({ badgeTitle }) => {
  return (
    <span className="text-xs uppercase tracking-widest text-brand-teal dark:text-brand-green font-bold bg-brand-teal/10 dark:bg-brand-green/10 px-3 py-1 rounded-full">
      {badgeTitle}
    </span>
  );
};

export const SectionTitle = ({ badgeTitle }) => {
  return <div>{badgeTitle}</div>;
};
