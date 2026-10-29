// import { IconLock, IconPhone } from "@tabler/icons-react";

import { SectionNameBadge } from "../UI/Badges";

const SoloShowCase = () => {
  return (
    <section
      id="focus-product"
      //   className="py-16 lg:py-24 bg-slate-50 dark:bg-brand-slate"
      className="py-16 lg:py-24 bg-slate-50 dark:bg-[#0B1322]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-xl"> */}
        <div className="bg-white dark:bg-[#0B1322] rounded-3xl p-6 sm:p-10">
          {/* Section Header */}
          <div className="text-center mb-8">
            <SectionNameBadge badgeTitle={"পণ্যটির ভিডিও"} />
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#3b2219] dark:text-[#f4ebd0] mb-2 font-serif mt-3">
              {/* প্রথমে ১ মিনিটে পণ্যটি দেখে নিন */}
              প্রথমে এক নজরে পণ্যটি দেখে নিন
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed lg:w-3xl mx-auto">
              {/* <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed"> */}
              পেরুভিয়ান ব্ল্যাক ম্যাকা রুট, লাল জিনসেং ও প্রিমিয়াম অ্যারাবিকা
              কফির মেলবন্ধনে তৈরি। সম্পূর্ণ স্টেরয়েডমুক্ত এই প্রাকৃতিক ব্লেন্ড
              শরীরের স্বাভাবিক হরমোন ও শক্তি পুনরুজ্জীবিত করতে কার্যকর।
              {/* </p> */}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Column - YouTube Video Integration */}
            <div className="lg:col-span-12 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-xl  max-h-145 aspect-9/16 rounded-2xl overflow-hidden bg-linear-to-tr from-brand-teal to-brand-green p-1 shadow-2xl flex items-center justify-center">
                <div className="w-full h-full rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                  {/* <iframe
                    className="w-full h-full object-cover"
                    src="https://www.youtube.com/embed/dUjFhpYoLPw"
                    title="Benefits of Maca Coffee with Cinnamon for health | how to be a king"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe> */}

                  <video
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    src="/videos/videoGoogleVids.mp4"
                  >
                    আপনার ব্রাউজারটি ভিডিও ট্যাগ সমর্থন করে না।
                  </video>
                </div>
              </div>
            </div>

            {/* Details Column */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoloShowCase;
