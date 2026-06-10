"use client";

import { createContext, useContext, useState } from "react";

const PolicySlugContext = createContext(null);

export function PolicySlugProvider({ children }) {
    const [privacyPolicySlug, setPrivacyPolicySlug] = useState("privacy-policy");

    return (
        <PolicySlugContext.Provider value={{ privacyPolicySlug, setPrivacyPolicySlug }}>
            {children}
        </PolicySlugContext.Provider>
    );
}

export const usePolicySlug = () => {
    const context = useContext(PolicySlugContext);
    if (!context) {
        throw new Error("usePolicySlug must be used within a PolicySlugProvider");
    }
    return context;
};
