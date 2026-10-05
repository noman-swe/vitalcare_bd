import { Footer } from "./Common/Footer";
import { Header } from "./Common/Header";

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-slate text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 flex flex-col justify-between">
      {/* হেডার */}
      <Header />

      {/* মূল কন্টেন্ট (চিলড্রেন) */}
      <main className="grow">{children}</main>

      {/* ফুটার */}
      <Footer />
    </div>
  );
};
