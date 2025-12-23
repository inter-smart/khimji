import InnerHero from "@/components/common/InnerHero";
import FaqSection from "@/components/features/faq/FaqSection";

const local_data = {
  faq_section_data: {
    title: "FREQUENTLY ASKED QUESTIONS",
    faq_list: [
      {
        id: 1,
        title: "Where is the Khimji Ramdas head office located?",
        description:
          "<p>Yes. Through our Corporate Social Responsibility (CSR) programs, KR actively contributes to education, environment, and social development projects that support the Sultanate’s national vision.</p>",
      },
      {
        id: 2,
        title: "Does Khimji Ramdas support community initiatives?",
        description:
          "<p>Yes. Through our Corporate Social Responsibility (CSR) programs, KR actively contributes to education, environment, and social development projects that support the Sultanate’s national vision.</p>",
      },
      {
        id: 3,
        title: "How can I contact Khimji Ramdas?",
        description:
          "<p>Yes. Through our Corporate Social Responsibility (CSR) programs, KR actively contributes to education, environment, and social development projects that support the Sultanate’s national vision.</p>",
      },
      {
        id: 4,
        title: "What are the main business divisions of Khimji Ramdas?",
        description:
          "<p>Yes. Through our Corporate Social Responsibility (CSR) programs, KR actively contributes to education, environment, and social development projects that support the Sultanate’s national vision.</p>",
      },
      {
        id: 5,
        title: "Where is the Khimji Ramdas head office located?",
        description:
          "<p>Yes. Through our Corporate Social Responsibility (CSR) programs, KR actively contributes to education, environment, and social development projects that support the Sultanate’s national vision.</p>",
      },
      {
        id: 6,
        title: "How can I contact Khimji Ramdas?",
        description:
          "<p>Yes. Through our Corporate Social Responsibility (CSR) programs, KR actively contributes to education, environment, and social development projects that support the Sultanate’s national vision.</p>",
      },
      {
        id: 7,
        title: "What are the main business divisions of Khimji Ramdas?",
        description:
          "<p>Yes. Through our Corporate Social Responsibility (CSR) programs, KR actively contributes to education, environment, and social development projects that support the Sultanate’s national vision.</p>",
      },
      {
        id: 8,
        title: "Where is the Khimji Ramdas head office located?",
        description:
          "<p>Yes. Through our Corporate Social Responsibility (CSR) programs, KR actively contributes to education, environment, and social development projects that support the Sultanate’s national vision.</p>",
      },
      {
        id: 9,
        title: "How can I contact Khimji Ramdas?",
        description:
          "<p>Yes. Through our Corporate Social Responsibility (CSR) programs, KR actively contributes to education, environment, and social development projects that support the Sultanate’s national vision.</p>",
      },
      {
        id: 10,
        title: "What are the main business divisions of Khimji Ramdas?",
        description:
          "<p>Yes. Through our Corporate Social Responsibility (CSR) programs, KR actively contributes to education, environment, and social development projects that support the Sultanate’s national vision.</p>",
      },
      {
        id: 11,
        title: "Where is the Khimji Ramdas head office located?",
        description:
          "<p>Yes. Through our Corporate Social Responsibility (CSR) programs, KR actively contributes to education, environment, and social development projects that support the Sultanate’s national vision.</p>",
      },
      {
        id: 12,
        title: "How can I contact Khimji Ramdas?",
        description:
          "<p>Yes. Through our Corporate Social Responsibility (CSR) programs, KR actively contributes to education, environment, and social development projects that support the Sultanate’s national vision.</p>",
      },
      {
        id: 13,
        title: "What are the main business divisions of Khimji Ramdas?",
        description:
          "<p>Yes. Through our Corporate Social Responsibility (CSR) programs, KR actively contributes to education, environment, and social development projects that support the Sultanate’s national vision.</p>",
      },
      {
        id: 14,
        title: "Where is the Khimji Ramdas head office located?",
        description:
          "<p>Yes. Through our Corporate Social Responsibility (CSR) programs, KR actively contributes to education, environment, and social development projects that support the Sultanate’s national vision.</p>",
      },
      {
        id: 15,
        title: "How can I contact Khimji Ramdas?",
        description:
          "<p>Yes. Through our Corporate Social Responsibility (CSR) programs, KR actively contributes to education, environment, and social development projects that support the Sultanate’s national vision.</p>",
      },
    ],
  },
};

export default function page() {
  return (
    <>
      <InnerHero
        coverImage="/images/faq_innerbanner.jpg"
        coverImageMobile="/images/faq_innerbanner.jpg"
        alt="Faq Banner"
        title="FAQ"
        breadCrumb_data={[
          { link: { href: "/", label: "Home" } },
          { link: { href: "/heritage", label: "Faq" } },
        ]}
      />
      <FaqSection data={local_data?.faq_section_data} />
    </>
  );
}
