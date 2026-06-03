"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, SearchX } from "lucide-react";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function NotFoundClient() {
  const t = useTranslations("notFound");
  const params = useParams();
  const locale = params?.lang || "en";
  const isRTL = locale === "ar";

  return (
     <main className="relative overflow-hidden min-h-screen bg-white flex items-center justify-center px-6 py-20">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#2FDDC3]/30 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#0B436A]/20 blur-[120px] rounded-full"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:60px_60px]" />

            <div className="relative z-10 max-w-[900px] w-full text-center">
                {/* Animated Icon */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mb-8"
                >
                    <div className="w-[110px] h-[110px] rounded-full bg-gradient-to-r from-[#0B436A] to-[#299B8A] flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                        <SearchX className="text-white w-12 h-12" />
                    </div>
                </motion.div>

                {/* 404 Number */}
                <motion.h1
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-[90px] sm:text-[130px] lg:text-[180px] font-bold leading-none tracking-[-6px] bg-gradient-to-r from-[#0B436A] to-[#299B8A] bg-clip-text text-transparent"
                >
                    404
                </motion.h1>

                {/* Heading */}
                <motion.h2
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="text-[28px] sm:text-[36px] lg:text-[48px] font-semibold text-[#0B436A] mt-2"
                >
                    {t("title")}
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="max-w-[650px] mx-auto mt-6 text-[15px] sm:text-[18px] leading-[1.8] text-[#5B5B5B]"
                >
                    {t("description")}
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.65 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
                >
                    <Link
                        href={`/${locale}`}
                        className="group inline-flex items-center gap-2 px-7 py-4 rounded-full leading-1 bg-[#0B436A] text-white text-[15px] font-medium hover:bg-[#299B8A] transition-all duration-300 shadow-lg"
                    >
                        <Home className="w-5 h-5" />
                        {t("goHome")}
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="group inline-flex items-center gap-2 px-7 py-4 rounded-full leading-1 border border-[#0B436A]/20 text-[#0B436A] text-[15px] font-medium hover:bg-[#0B436A] hover:text-white transition-all duration-300"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        {t("goBack")}
                    </button>
                </motion.div>

                {/* Floating Shapes */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 5,
                    }}
                    className="absolute left-[5%] top-[15%] hidden lg:block"
                >
                    <div className="w-5 h-5 rounded-full bg-[#299B8A]" />
                </motion.div>

                <motion.div
                    animate={{
                        y: [0, 20, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 6,
                    }}
                    className="absolute right-[8%] bottom-[20%] hidden lg:block"
                >
                    <div className="w-8 h-8 rounded-full border-4 border-[#0B436A]" />
                </motion.div>
            </div>
        </main>
  );
}
