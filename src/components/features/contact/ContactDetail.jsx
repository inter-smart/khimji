"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function ContactDetail({ sectors, cms, lang, country }) {
  const [activeTab, setActiveTab] = useState(sectors?.[0]?.id);
  const [contactData, setContactData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContactData = async (sectorId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact-list?sector_id=${sectorId}`, {
        headers: {
          "Accept-Language": lang,
          "Location-Slug": country,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch contact data");
      }

      const result = await response.json();

      if (result.status && result.data) {
        setContactData((prev) => ({
          ...prev,
          [sectorId]: result.data.categories,
        }));
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching contact data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data for the first tab on mount
  useEffect(() => {
    if (sectors?.[0]?.id && !contactData[sectors[0].id]) {
      fetchContactData(sectors[0].id);
    }
  }, []);

  const handleTabChange = (value) => {
    setActiveTab(value);

    // Fetch data if not already cached
    if (!contactData[value]) {
      fetchContactData(value);
    }
  };

  return (
    <div className="w-full h-auto block">
      <h2 className="text-[22px] sm:text-[28px] lg:text-[34px] 2xl:text-[40px] 3xl:text-[50px] leading-[1.3] font-normal text-[#0B436A] text-center mb-[15px] sm:mb-[20px] lg:mb-[25px] 2xl:mb-[30px] 3xl:mb-[35px]">
        {cms?.title2 || "CONTACT DETAILS"}
      </h2>
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="w-auto h-auto gap-[5px] 2xl:gap-[10px] mx-auto mb-[20px] sm:mb-[30px] lg:mb-[40px] 2xl:mb-[50px] 3xl:mb-[60px] bg-transparent flex flex-wrap justify-center">
          {sectors?.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.id}
              className="text-[13px] sm:text-[14px] 2xl:text-[16px] 3xl:text-[18px] leading-[1] font-normal text-black uppercase w-auto h-auto p-[10px_15px] sm:p-[12px_20px] 2xl:p-[15px_25px] rounded-[0] !shadow-none border-transparent cursor-pointer flex relative z-0 data-[state=active]:text-white before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#0B436A] before:to-[#299B8A] before:opacity-30 data-[state=active]:before:opacity-100 before:transition-all before:duration-300 after:content-[''] after:absolute after:inset-[1px] after:bg-white data-[state=active]:after:bg-transparent before:z-[-2] after:z-[-1] after:transition-all after:duration-300 hover:before:opacity-100"
            >
              {item?.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {sectors?.map((sector) => (
          <TabsContent key={sector.id} value={sector.id}>
            <div className="w-full h-auto p-[20px] lg:p-[30px] 2xl:p-[40px] 3xl:p-[50px] bg-white rounded-[8px]">
              {loading && (
                <div className="w-full h-[200px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-[#0B436A] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[14px] text-[#0B436A]">Loading contact details...</p>
                  </div>
                </div>
              )}
              {contactData[sector.id]?.map((category) => (
                <div
                  key={category.id}
                  className="w-full h-auto py-[20px] sm:py-[25px] lg:py-[30px] 2xl:py-[35px] 3xl:py-[45px] border-b border-[#00416B]/20 last:border-b-0 first:pt-0 block"
                >
                  <div className="text-[16px] sm:text-[18px] lg:text-[20px] 2xl:text-[24px] 3xl:text-[30px] leading-[1.2] font-normal text-[#0B436A] mb-[15px] sm:mb-[20px] 3xl:mb-[25px]">
                    {category?.title}
                  </div>
                  <div className="sm:mx-[-10px] lg:mx-[-15px] 2xl:mx-[-20px] 3xl:mx-[-25px] flex flex-wrap">
                    {category?.contacts?.map((contact) => (
                      <div
                        key={contact.id}
                        className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 h-auto py-[5px] sm:p-[10px] lg:p-[10px_15px] 2xl:p-[15px_20px] 3xl:p-[15px_25px]"
                      >
                        <div className="w-full h-full p-[15px] sm:p-[20px] 2xl:p-[30px] rounded-[5px] overflow-hidden block relative z-0 data-[state=active]:text-white before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#0B436A] before:to-[#299B8A] before:rounded-[5px] before:opacity-60 after:content-[''] after:absolute after:inset-[1px] after:bg-white after:rounded-[5px] before:z-[-2] after:z-[-1] hover:before:opacity-100 before:transition-all before:duration-300">
                          <div className="text-[16px] lg:text-[18px] 2xl:text-[22px] 3xl:text-[28px] leading-[1.3] font-normal text-[#0B436A] mb-[10px] sm:mb-[15px] 2xl:mb-[25px]">
                            {contact?.title}
                          </div>
                          {contact?.content && (
                            <div
                              dangerouslySetInnerHTML={{ __html: contact.content }}
                              suppressHydrationWarning
                              className="text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.4] font-normal text-black [&>p]:m-0 [&_p_strong]:text-[#00416B]"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {!loading && !error && !contactData[sector.id] && (
                <div className="w-full h-[200px] flex items-center justify-center">
                  <p className="text-[14px] text-gray-500">No contact details available</p>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
