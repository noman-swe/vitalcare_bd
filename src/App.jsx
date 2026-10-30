import { useState } from "react";
import FaqSection from "./components/Common/FaqSection";
import CustomerReviews from "./components/Home/CustomerReviews";
import { Hero } from "./components/Home/Hero";
import TrustBadges from "./components/Home/TrustBadges";
import WhyVitalCare from "./components/Home/WhyVitalCare";
import { Layout } from "./components/Layout";
import { productsData } from "./data/products";
import { Checkout } from "./components/Checkout/Checkout";
import { CartDrawer } from "./components/Checkout/CartDrawer";
import { OrderSuccessModal } from "./components/UI/OrderSuccessModal";
import SoloShowCase from "./components/Home/SoloShowCase";
import ProductVisuals from "./components/Home/ProductVisuals";

export default function App() {
  const [selectedProductForQuickOrder, setSelectedProductForQuickOrder] =
    useState(productsData[0]);

  return (
    <Layout>
      <Hero />
      <SoloShowCase />
      <WhyVitalCare />
      <TrustBadges />
      <CustomerReviews />
      <ProductVisuals />

      <Checkout
        selectedProduct={selectedProductForQuickOrder}
        setSelectedProduct={setSelectedProductForQuickOrder}
      />
      <FaqSection />
      {/* Cart Drawer & Success Modal */}
      <CartDrawer />
      <OrderSuccessModal />
    </Layout>
  );
}
