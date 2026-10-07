import { useCart } from "../../context/CartContext";

export const OrderSuccessModal = () => {
  const { showSuccessModal, setShowSuccessModal, orderId } = useCart();

  if (!showSuccessModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl border border-slate-100 dark:border-slate-800">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 dark:text-emerald-400 text-3xl">
          ✓
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          আপনার অর্ডারটি সফল হয়েছে!
        </h3>

        {orderId && (
          <div className="my-3 py-2 px-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 inline-block">
            <span className="text-xs text-slate-600 dark:text-slate-400 block">
              অর্ডার নম্বর
            </span>
            <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 tracking-wider">
              {orderId}
            </span>
          </div>
        )}

        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।
        </p>

        <button
          onClick={() => setShowSuccessModal(false)}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition"
        >
          ঠিক আছে
        </button>
      </div>
    </div>
  );
};
