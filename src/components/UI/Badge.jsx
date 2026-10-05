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
