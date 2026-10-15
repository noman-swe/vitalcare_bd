import { useState, useRef, useEffect } from "react";
import {
  IconCircleCheck,
  IconZoomIn,
  IconCertificate,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { productVisualData } from "../../data/porductVisualData";
import { SectionNameBadge } from "../UI/Badges";

const ProductVisuals = () => {
  const { header, certificate, gallery } = productVisualData;
  const [selectedImage, setSelectedImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollContainerRef = useRef(null);

  // Manual scroll handler for mobile/horizontal view
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Auto scroll effect for mobile view on hover/touch
  useEffect(() => {
    if (!isHovered) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 5) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollContainerRef.current.scrollBy({
            left: 280,
            behavior: "smooth",
          });
        }
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section
      id="gallery"
      className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionNameBadge badgeTitle={header.badge} />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mt-3">
            {header.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            {header.description}
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 1. Left Certificate Box (Sticky on Desktop) */}
          <div className="lg:col-span-5 w-full lg:sticky lg:top-24">
            <div
              onClick={() => setSelectedImage(certificate.image)}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border-2 border-brand-green/30 dark:border-brand-green/20 flex flex-col justify-between group cursor-pointer hover:border-brand-green transition-all shadow-sm hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-green bg-brand-green/10 px-3 py-1 rounded-full">
                    <IconCircleCheck size={14} />
                    {certificate.badge}
                  </span>
                  <IconCertificate className="text-brand-green" size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {certificate.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                  {certificate.issuer}
                </p>
              </div>

              {/* Certificate Image */}
              <div className="relative w-full h-72 sm:h-80 bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 p-2 flex items-center justify-center">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                  <span className="text-white text-xs font-medium flex items-center gap-1 bg-black/60 px-3 py-1.5 rounded-full">
                    <IconZoomIn size={16} /> Boro kore dekhun
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Right Product Section (Desktop: Vertical Grid | Mobile: Horizontal Scroll with Navigators) */}
          <div
            className="lg:col-span-7 relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
          >
            {/* Left Navigator Button (<) - Only visible on mobile/tablet view */}
            <button
              onClick={() => handleScroll("left")}
              aria-label="Previous"
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 items-center justify-center hover:bg-brand-green hover:text-white transition-all opacity-80 group-hover:opacity-100 sm:hidden flex"
            >
              <IconChevronLeft size={20} />
            </button>

            {/* Right Navigator Button (>) - Only visible on mobile/tablet view */}
            <button
              onClick={() => handleScroll("right")}
              aria-label="Next"
              className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200  items-center justify-center hover:bg-brand-green hover:text-white transition-all opacity-80 group-hover:opacity-100 sm:hidden flex"
            >
              <IconChevronRight size={20} />
            </button>

            {/* Gallery Container: Horizontal scroll on mobile (flex), Normal grid on desktop (lg:grid) */}
            <div
              ref={scrollContainerRef}
              className="flex lg:grid lg:grid-cols-2 gap-4 overflow-x-auto lg:overflow-visible overflow-y-hidden snap-x snap-mandatory py-2 px-1 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {gallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedImage(item.image)}
                  className="min-w-65 sm:min-w-70 lg:min-w-full w-full snap-start p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 hover:border-brand-green/50 transition-all cursor-pointer group/card flex flex-col justify-between shadow-sm"
                >
                  <div className="h-48 sm:h-44 bg-white dark:bg-slate-900 rounded-xl overflow-hidden relative mb-3 border border-slate-100 dark:border-slate-800">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                      <IconZoomIn className="text-white" size={24} />
                    </div>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 text-center truncate">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Image Zoom Modal / Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full bg-white dark:bg-slate-900 p-3 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="w-full max-h-[85vh] object-contain rounded-xl"
              />
              <p className="text-center text-xs text-slate-400 py-2">
                Jekono sthane click kore bondho korun
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductVisuals;
