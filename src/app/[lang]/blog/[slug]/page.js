import BlogDetailSection from "@/components/features/blog/BlogDetailSection";
import RelatedBlogSection from "@/components/features/blog/RelatedBlogSection";
import { getData } from "@/lib/server/api";

const local_data = {
  blog_detail_section_data: {
    title: "SPAR OMAN OPENS IN AL AMERAT - SPECIAL LAUNCH OFFERS AVAILABLE UNTIL 6TH SEPTEMBER",
    media: {
      type: "image",
      path: "/images/blog_detail.jpg",
      alt: "Blog Detail",
    },
    date: "April 9, 2025",
    text_editor_content: `<p>Muscat: Khimji Ramdas, one of Oman’s most trusted and diversified business conglomerates, has announced the launch of KRHL – a specialized entity dedicated to heavy lift logistics and project cargo solutions. The new business is designed to meet the growing demand for safe, reliable, and innovative transportation of oversized and heavy cargo across critical sectors, including energy, oil and gas, infrastructure, mining, and construction. KRHL positions itself as a key player in shipping in Oman, providing end-to-end solutions for complex cargo projects.</p>
    <p>As Oman accelerates investments in green energy, infrastructure development, and industrial projects, KRHL brings world-class expertise to manage heavy lift requirements from planning through execution. With a safety-first approach, KRHL delivers comprehensive solutions encompassing feasibility studies, engineering support, multimodal transportation, route surveys, permit acquisition, installation using jacking and skidding methods, and on-site coordination. This makes KRHL a premier partner for businesses looking for specialized logistics in Oman.</p>
    <img src="/images/blog-detail-1.jpg" />
    <p>“KRHL represents our commitment to driving Oman’s growth by providing specialized logistics solutions that match the scale and complexity of the nation’s most ambitious projects,” said Malvika Khimji, Director, Khimji Ramdas. “Our focus on innovation, precision, and operational excellence ensures that KRHL stands as a trusted partner for industries looking to move forward – literally and figuratively.” </p>
    <p> Arijit Das, Head of Projects and Inland Logistics at Khimji Ramdas Shipping, added: “The launch of KRHL is a natural extension of the company’s legacy in supply chain in Oman and shipping. By combining international technology with our local expertise, we are uniquely positioned to deliver safe, reliable, and innovative solutions for oversized and heavy cargo. Our goal is to empower industries in Oman and beyond with logistics capabilities that keep pace with the scale of their ambitions.”</p>
    <p>“TII Group is a global leader in specialized transport solutions from Germany and is proud to partner with KRHL in bringing world-class TII SCHEUERLE heavy haulage capabilities to Oman. Our advanced heavy-duty trailers and transport solutions, combined with KRHL’s deep expertise and local market understanding, ensure that even the most challenging loads are moved with precision, safety, and efficiency. This collaboration marks a significant step toward setting new standards for heavy lift logistics in the region,” stated Thomas Ziegler, Global Head of Sales Heavy Transport. </p>
    <p>Leveraging the heritage and expertise of Khimji Ramdas Shipping, KRHL is well-positioned to set new benchmarks among shipping companies in Oman. By combining specialized equipment, advanced engineering capabilities, and a highly skilled team, KRHL ensures the safe, efficient, and timely movement of heavy and over-dimensional cargo, supporting the success of large-scale industrial and infrastructure projects worldwide.  </p>
    <p>With KRHL’s launch, Khimji Ramdas reinforces its position as a trusted partner in shipping in Oman, offering world-class solutions in logistics in Oman and building a robust supply chain in Oman for industries handling oversized and complex cargo.</p>
    `,
  },
  related_blog_section_data: {
    related_blogs: [
      {
        media: {
          type: "image",
          path: "/images/blog-4.webp",
          alt: "Blog",
        },
        date: "April 9, 2025",
        title: "SPAR Oman concludes successful ‘SPAR 24 Karat Ramadan: Win Everyday’ campaign",
        button: {
          link: "/",
          target: true,
        },
      },
      {
        media: {
          type: "image",
          path: "/images/blog-5.webp",
          alt: "Blog",
        },
        date: "June 2, 2025",
        title: "Khimji Ramdas Special Projects delivers world-class Indoor Shooting Range ‘Action Point’",
        button: {
          link: "/",
          target: true,
        },
      },
      {
        media: {
          type: "image",
          path: "/images/blog-6.webp",
          alt: "Blog",
        },
        date: "May 5, 2025",
        title: "SPAR Oman opens in Al Amerat- Special launch offers available until 6th September",
        button: {
          link: "/",
          target: true,
        },
      },
      {
        media: {
          type: "image",
          path: "/images/blog-7.webp",
          alt: "Blog",
        },
        date: "March 10 , 2025",
        title: "KR Shipping successfully manages Costa Smeralda’s maiden season",
        button: {
          link: "/",
          target: true,
        },
      },
    ],
  },
};

export default async function page({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const { slug, lang } = resolvedParams;
  const { data, error } = await getData(`blog-details?slug=${slug}`, lang);

  return (
    <>
      <BlogDetailSection data={data} />
      <RelatedBlogSection data={data?.related_blogs} />
    </>
  );
}
