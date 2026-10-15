export const productsData = [
  {
    id: "macca-coffee",
    name: "ম্যাকা কফি",
    discountPercentage: 50, // এখানে আপনার ইচ্ছামতো ডিসকাউন্ট পার্সেন্টেজ দিতে পারেন (যেমন: 50 মানে ৫০% ছাড়)
    badge: "৫০% ছাড়",
    category: "বেস্টসেলার #১",
    description:
      "প্রাকৃতিক শারীরিক এনার্জি, দীর্ঘস্থায়ী স্ট্যামিনা ও ক্লান্তিহীন সতেজতার জন্য পেরুভিয়ান ব্ল্যাক ম্যাকা মিশ্রিত প্রিমিয়াম কফি।",
    image: "/images/product-1.jpeg",
    isFeaturedLarge: false,
    variants: [
      {
        id: "macca-coffee-10",
        title: "১০ স্যাচেট প্যাকেট",
        image: "/images/product-1.jpeg",
        originalPrice: 1550, // শুধু মূল দাম বা Regular Price দিলেই ডিসকাউন্ট অনুযায়ী অফার প্রাইস অটো ক্যালকুলেট হবে
      },
      {
        id: "macca-coffee-6",
        title: "৬ স্যাচেট প্যাকেট",
        image: "/images/product-6.jpeg",
        originalPrice: 930,
      },
    ],
  },
];
