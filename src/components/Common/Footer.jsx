export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
            <span>VitalCare</span>
            <span className="text-brand-green">BD</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            VitalCareBD নিয়ে এসেছে প্রিমিয়াম অর্গানিক ও প্রাকৃতিক হেলথ সমাধান।
            আমরা গ্রাহকের সর্বোচ্চ শারীরিক সুরক্ষা ও ১০০% গোপনীয়তা নিশ্চিত করি।
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
            কুইক লিঙ্ক
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#hero" className="hover:text-brand-green transition">
                হোম
              </a>
            </li>
            <li>
              <a href="#catalog" className="hover:text-brand-green transition">
                প্রোডাক্ট ক্যাটালগ
              </a>
            </li>
            <li>
              <a href="#benefits" className="hover:text-brand-green transition">
                স্বাস্থ্য উপকারিতা
              </a>
            </li>
            <li>
              <a
                href="#checkout-section"
                className="hover:text-brand-green transition"
              >
                অর্ডার করুন
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
            গোপনীয়তা ও সাপোর্ট
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>✓ ১০০% ডিসক্রিট ও আনমার্কেড বক্সে ডেলিভারি</li>
            <li>✓ ক্যাশ অন ডেলিভারি (পণ্য দেখে মূল্য পরিশোধ)</li>
            <li>✓ ২৪/৭ সাপোর্ট হেল্পলাইন: ০১৭০০-০০০০০০</li>
            <li>✓ ঢাকা ও বাইরে ২-৩ দিনে দ্রুত হোম ডেলিভারি</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
            পেমেন্ট মাধ্যম
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            পণ্য হাতে পেয়ে চেক করে শুধুমাত্র ক্যাশ পরিশোধ করুন (Cash on
            Delivery)।
          </p>
          <span className="inline-block px-3 py-1.5 rounded bg-emerald-950 text-brand-green border border-emerald-800 text-xs font-bold">
            ক্যাশ অন ডেলিভারি সুবিধা
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} VitalCareBD. All Rights Reserved.
      </div>
    </footer>
  );
};
