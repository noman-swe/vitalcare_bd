import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export const ScrollButtons = ({ scrollRef, onScroll }) => (
  <>
    {/* Left Button (<) - Mobile Only */}
    <button
      onClick={() => onScroll(scrollRef, "left")}
      aria-label="Previous"
      className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-brand-green hover:text-white transition-all opacity-80 group-hover:opacity-100 sm:hidden"
    >
      <IconChevronLeft size={20} />
    </button>

    {/* Right Button (>) - Mobile Only */}
    <button
      onClick={() => onScroll(scrollRef, "right")}
      aria-label="Next"
      className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-brand-green hover:text-white transition-all opacity-80 group-hover:opacity-100 sm:hidden"
    >
      <IconChevronRight size={20} />
    </button>
  </>
);
