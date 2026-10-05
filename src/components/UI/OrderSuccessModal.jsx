import { useCart } from "../../context/CartContext";

export const OrderSuccessModal = () => {
  const { showSuccessModal } = useCart();

  if (!showSuccessModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl transform transition-all scale-100">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-brand-green rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
          ✓
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">
          অর্ডার সফল হয়েছে!
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। আমাদের প্রতিনিধি শীঘ্রই আপনার
          সাথে যোগাযোগ করবে।
        </p>
      </div>
    </div>
  );
};
