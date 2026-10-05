import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";
import { faqSectionData } from "../../data/faqData";

const FaqSection = () => {
  const { header, faqs } = faqSectionData;
  const [openId, setOpenId] = useState(null);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="py-16 bg-white dark:bg-[#0B1322] border-y border-slate-200 dark:border-brand-slate-border"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-brand-green font-bold bg-brand-green/10 px-3 py-1 rounded-full">
            {header.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-2">
            {header.title}
          </h2>
        </div>

        {/* Dynamic Accordion List with Smooth Slide Animation */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-slate-50 dark:bg-brand-slate-card border border-slate-200 dark:border-brand-slate-border overflow-hidden transition-colors duration-300"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-slate-900 dark:text-white text-base focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <IconChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180 text-brand-green" : ""
                    }`}
                  />
                </button>

                {/* Smooth Max-Height & Opacity Transition Wrapper */}
                <div
                  className="transition-all duration-300 ease-in-out overflow-hidden"
                  style={{
                    maxHeight: isOpen ? "250px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-700 pt-3">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
