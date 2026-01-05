"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function NotFoundClient() {
  const params = useParams();
  const locale = params?.lang || "en";
  const isRTL = locale === "ar";

  const content = {
    en: {
      title: "Page Not Found",
      description: "Sorry, the page you are looking for doesn't exist or has been moved.",
      homeButton: "Go Home",
      backButton: "Go Back",
    },
    ar: {
      title: "الصفحة غير موجودة",
      description: "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
      homeButton: "العودة للرئيسية",
      backButton: "رجوع",
    },
  };

  const text = content[locale] || content.en;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-md w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-[150px] sm:text-[200px] font-bold text-gray-200 leading-none">404</h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3">{text.title}</h2>
          <p className="text-gray-600 text-base sm:text-lg">{text.description}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-black hover:bg-gray-800 rounded-md transition-colors duration-200"
          >
            <svg className={`w-5 h-5 ${isRTL ? "ml-2" : "mr-2"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            {text.homeButton}
          </Link>
        </div>
      </div>
    </div>
  );
}
