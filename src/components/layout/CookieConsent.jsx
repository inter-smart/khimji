"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export default function CookieConsent() {
    const t = useTranslations("cookie");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            // Show after a short delay for smoother UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "accepted");
        setIsVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem("cookieConsent", "rejected");
        setIsVisible(false);
    };

    const handleCustomise = () => {
        // Logic for customize modal or settings page could go here
        console.log("Customise cookies clicked");
        // For now, treat as accept or implement specific logic
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: -50 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed bottom-6 left-6 z-[9999] w-[calc(100%-48px)] max-w-[480px] bg-white p-6 md:p-8 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.1)] border border-gray-100"
                >
                    <h3 className="text-[#0B436A] text-[20px] md:text-[22px] font-normal uppercase tracking-wide mb-4">
                        {t("title")}
                    </h3>
                    <p className="text-[#333333] text-[14px] md:text-[15px] leading-relaxed mb-8 font-light">
                        {t("description")}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleCustomise}
                            className="flex-1 py-3 px-4 border border-[#0B436A]/30 text-[#0B436A] text-[14px] cursor-pointer bg-transparent hover:bg-[#0B436A] hover:text-white transition-all duration-300"
                        >
                            {t("customise")}
                        </button>
                        <button
                            onClick={handleReject}
                            className="flex-1 py-3 px-4 border border-[#0B436A]/30 text-[#0B436A] text-[14px] cursor-pointer bg-transparent hover:bg-[#0B436A] hover:text-white transition-all duration-300"
                        >
                            {t("rejectAll")}
                        </button>
                        <button
                            onClick={handleAccept}
                            className="flex-1 py-3 px-4 bg-[#0B436A] text-white text-[14px] hover:bg-[#082f4a] cursor-pointer transition-all duration-300 shadow-sm"
                        >
                            {t("acceptAll")}
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
