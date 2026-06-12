"use client";
 
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
 
export default function CookieConsent() {
    const t = useTranslations("cookie");
    const [isVisible, setIsVisible] = useState(false);
    const [isRendered, setIsRendered] = useState(false);
 
    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            // Show after a short delay for smoother UX
            const timer = setTimeout(() => {
                setIsRendered(true);
                // Trigger visibility state in next frame for transition to play
                setTimeout(() => setIsVisible(true), 50);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);
 
    const handleClose = (consentType) => {
        localStorage.setItem("cookieConsent", consentType);
        setIsVisible(false);
        // Remove from DOM after transition finishes
        setTimeout(() => setIsRendered(false), 500);
    };
 
    const handleAccept = () => {
        handleClose("accepted");
    };
 
    const handleReject = () => {
        handleClose("rejected");
    };
 
    const handleCustomise = () => {
        handleAccept();
    };
 
    if (!isRendered) return null;
 
    return (
        <div
            className={`fixed bottom-6 left-6 z-[9999999] w-[calc(100%-48px)] max-w-[480px] bg-white p-6 md:p-8 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.1)] border border-gray-100 transition-all duration-500 ease-out transform ${
                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
            }`}
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
        </div>
    );
}
