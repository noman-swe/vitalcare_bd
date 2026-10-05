import { useState } from "react";
import FaqSection from "./components/Common/FaqSection";
import RecommendedProducts from "./components/Common/RecommandedProducts";
import CustomerReviews from "./components/Home/CustomerReviews";
import { FocusProduct } from "./components/Home/FocusProduct";
import { Hero } from "./components/Home/Hero";
import TrustBadges from "./components/Home/TrustBadges";
import WhyVitalCare from "./components/Home/WhyVitalCare";
import { Layout } from "./components/Layout";
// import { ProductCard } from "./components/UI/ProductCard";
// import { SectionTitle } from "./components/UI/SectionTitle";
// import { useCart } from "./context/CartContext";
import { productsData } from "./data/products";
import { Checkout } from "./components/Checkout/Checkout";
import { CartDrawer } from "./components/Checkout/CartDrawer";
import { OrderSuccessModal } from "./components/UI/OrderSuccessModal";

// const DynamicCatalog = ({ onQuickOrderSelect }) => {
//   const { addToCart } = useCart();

//   const handleAddToCart = (product) => {
//     // শুধুমাত্র কার্টে যোগ হবে (Drawer খুলবে না)
//     addToCart(product, product.variants?.[0], 1);
//   };

//   return (
//     <section
//       id="catalog"
//       className="py-16 bg-white dark:bg-[#0B1322] border-y border-slate-200 dark:border-slate-800"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <SectionTitle
//           tag="নির্বাচিত ফর্মুলেশন"
//           title="VitalCareBD-এর প্রিমিয়াম ৫টি প্রোডাক্ট ক্যাটালগ"
//           subtitle="প্রতিটি উপাদান ল্যাব টেস্টেড ও প্রাকৃতিক শক্তিবর্ধক গুণে সমৃদ্ধ।"
//         />
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {productsData.map((product) => (
//             <ProductCard
//               key={product.id}
//               product={product}
//               onAddToCart={() => handleAddToCart(product)}
//               onQuickOrder={(prod) => onQuickOrderSelect(prod)}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

export default function App() {
  const [selectedProductForQuickOrder, setSelectedProductForQuickOrder] =
    useState(productsData[0]);

  // const handleQuickOrder = (product) => {
  //   setSelectedProductForQuickOrder(product);
  //   const checkoutEl = document.getElementById("checkout-section");
  //   if (checkoutEl) {
  //     checkoutEl.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  return (
    <Layout>
      <Hero />
      {/* <DynamicCatalog onQuickOrderSelect={handleQuickOrder} /> */}
      <FocusProduct />
      <WhyVitalCare />
      <TrustBadges />
      <CustomerReviews />
      <FaqSection />
      <RecommendedProducts />
      <Checkout
        selectedProduct={selectedProductForQuickOrder}
        setSelectedProduct={setSelectedProductForQuickOrder}
      />

      {/* Cart Drawer & Success Modal */}
      <CartDrawer />
      <OrderSuccessModal />
    </Layout>
  );
}