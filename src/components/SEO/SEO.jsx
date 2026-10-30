// src/components/SEO.jsx বা Home Page-এ যুক্ত করুন
import { Helmet } from "react-helmet-async";

export default function HomeSEO() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VitalCareBD",
    url: "https://vitalcarebd.com",
    logo: "https://vitalcarebd.com/vcare.jpg",
    sameAs: [
      "https://www.facebook.com/vitalcarebd1", // আপনার ফেসবুক পেজ লিঙ্ক
      //   "https://www.instagram.com/vitalcarebd", // ইনস্টাগ্রাম পেজ লিঙ্ক
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    </Helmet>
  );
}
