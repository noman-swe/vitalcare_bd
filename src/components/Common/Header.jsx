import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
// import { useCart } from "../../context/CartContext";
import { SpaIcon, LockIcon } from "../../icons/Icons";
import { IconMoon, IconPhone, IconSun } from "@tabler/icons-react";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  // const { totalItemsCount, setIsCartOpen } = useCart();

  // কোন সেকশনটি বর্তমানে একটিভ আছে তা ট্র্যাক করার জন্য স্টেট (শুরুতে #hero)
  const [activeSection, setActiveSection] = useState("#hero");

  const navLinks = [
    { href: "#hero", label: "হোম" },
    // { href: "#catalog", label: "পণ্যসমূহ" },
    { href: "#focus-product", label: "ম্যাকা কফি" },
    { href: "#benefits", label: "উপকারিতা" },
    { href: "#checkout-section", label: "অর্ডার ফর্ম" },
  ];

  // স্ক্রল করার সময় সেকশন ডিটেক্ট করার জন্য useEffect
  useEffect(() => {
    const handleScroll = () => {
      // সেকশনগুলোর আইডি (অ্যাঙ্কর ট্যাগ থেকে # বাদ দিয়ে)
      const sections = navLinks.map((link) => link.href.substring(1));

      const scrollPosition = window.scrollY + 200; // সামান্য অফসেট যাতে আগে থেকেইভ হয়

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(`#${sectionId}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-brand-slate/90 border-b border-slate-200 dark:border-slate-800">
      {/* Privacy Banner */}
      <div className="bg-brand-teal text-white text-xs sm:text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LockIcon size={16} />
            <span className="font-medium">
              ১০০% গোপনীয় ও সংরক্ষিত প্যাকেজিং (বক্সের বাইরে কোনো পণ্যের নাম
              থাকবে না)
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs">
            <span>সারাদেশে ক্যাশ অন ডেলিভারি</span>
            <span>•</span>
            <span>হেল্পলাইন: ০১৭৭৮-১৫৫১৮৪</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-brand-teal flex items-center justify-center text-brand-green shadow-md">
            <SpaIcon size={24} />
          </div>
          <div>
            <div className="flex items-center">
              <span className="text-2xl font-bold tracking-tight text-brand-teal dark:text-white">
                VitalCare
              </span>
              <span className="text-2xl font-bold tracking-tight text-brand-green">
                BD
              </span>
            </div>
            <p className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold leading-tight">
              Better Health | Brighter You
            </p>
          </div>
        </a>

        <nav className="hidden lg:flex items-center space-x-8 text-base font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "text-brand-teal dark:text-brand-green font-semibold transition"
                    : "text-slate-600 dark:text-slate-300 hover:text-brand-teal dark:hover:text-white transition"
                }
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:opacity-80 transition cursor-pointer"
            title="Theme Toggle"
          >
            {theme === "dark" ? <IconSun /> : <IconMoon />}
          </button>

          <a
            href="tel:01778155184"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-brand-teal dark:text-slate-200 font-semibold text-sm hover:border-brand-teal border border-transparent transition"
          >
            <IconPhone size={16} />
            <span>০১৭৭৮-১৫৫১৮৪</span>
          </a>

          {/* <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-green hover:bg-green-600 text-slate-950 font-bold text-sm transition cursor-pointer shadow-md"
          >
            <ShoppingCartIcon size={20} />
            <span className="hidden sm:inline">কার্ট</span>
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">
              {totalItemsCount}
            </span>
          </button> */}
        </div>
      </div>
    </header>
  );
};
