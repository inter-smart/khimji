import InnerHero from "@/components/common/InnerHero";
import CareerSection from "@/components/features/career/CareerSection";

const local_data = {
  career_section_data: {
    title: "Career @ KR GROUP",
    description:
      "At Khimji Ramdas we believe that our people are our greatest asset. We are a dynamic and innovative company dedicated to fostering a collaborative and inclusive work environment where every team member can thrive. Whether you’re just starting your career or looking to take it to the next level, we offer a range of opportunities to help you achieve your goals. Explore our current job openings and discover how you can make a difference with us.",
    button: {
      link: "hrd@kr.om",
      target: true,
      label: "hrd@kr.om",
    },
    careerList: [
      {
        title: "Promotions Coordinator",
        description:
          "At Khimji Ramdas we believe that our people are our greatest asset.",
        jobType: "Full Time",
        requirements: "Minimum 5 years of exp",
        responsibilities: [
          "Manage day-to-day administrative tasks and office operations",
          "Maintain records, filing systems, and documentation.",
          "Coordinate meetings, schedules, and communications.",
          "Assist HR and finance teams with clerical support.",
          "Handle office supplies and vendor management.",
        ],
        skills: [
          "Strong organizational and multitasking abilities.",
          "Excellent written and verbal communication.",
          "Proficiency in MS Office Suite (Word, Excel, Outlook).",
          "Attention to detail and problem-solving mindset.",
          "Ability to work independently and as part of a team.",
        ],
      },
      {
        title: "Office Administrator",
        description:
          "At Khimji Ramdas we believe that our people are our greatest asset. ",
        jobType: "Full Time",
        requirements: "Minimum 5 years of exp",
        responsibilities: [
          "Manage day-to-day administrative tasks and office operations",
          "Maintain records, filing systems, and documentation.",
          "Coordinate meetings, schedules, and communications.",
          "Assist HR and finance teams with clerical support.",
          "Handle office supplies and vendor management.",
        ],
        skills: [
          "Strong organizational and multitasking abilities.",
          "Excellent written and verbal communication.",
          "Proficiency in MS Office Suite (Word, Excel, Outlook).",
          "Attention to detail and problem-solving mindset.",
          "Ability to work independently and as part of a team.",
        ],
      },
      {
        title: "Internal Auditor",
        description:
          "At Khimji Ramdas we believe that our people are our greatest asset.",
        jobType: "Full Time",
        requirements: "Minimum 5 years of exp",
        responsibilities: [
          "Manage day-to-day administrative tasks and office operations",
          "Maintain records, filing systems, and documentation.",
          "Coordinate meetings, schedules, and communications.",
          "Assist HR and finance teams with clerical support.",
          "Handle office supplies and vendor management.",
        ],
        skills: [
          "Strong organizational and multitasking abilities.",
          "Excellent written and verbal communication.",
          "Proficiency in MS Office Suite (Word, Excel, Outlook).",
          "Attention to detail and problem-solving mindset.",
          "Ability to work independently and as part of a team.",
        ],
      },
      {
        title: "Promotions Coordinator",
        description:
          "At Khimji Ramdas we believe that our people are our greatest asset.",
        jobType: "Full Time",
        requirements: "Minimum 5 years of exp",
        responsibilities: [
          "Manage day-to-day administrative tasks and office operations",
          "Maintain records, filing systems, and documentation.",
          "Coordinate meetings, schedules, and communications.",
          "Assist HR and finance teams with clerical support.",
          "Handle office supplies and vendor management.",
        ],
        skills: [
          "Strong organizational and multitasking abilities.",
          "Excellent written and verbal communication.",
          "Proficiency in MS Office Suite (Word, Excel, Outlook).",
          "Attention to detail and problem-solving mindset.",
          "Ability to work independently and as part of a team.",
        ],
      },
      {
        title: "Internal Auditor",
        description:
          "At Khimji Ramdas we believe that our people are our greatest asset.",
        jobType: "Full Time",
        requirements: "Minimum 5 years of exp",
        responsibilities: [
          "Manage day-to-day administrative tasks and office operations",
          "Maintain records, filing systems, and documentation.",
          "Coordinate meetings, schedules, and communications.",
          "Assist HR and finance teams with clerical support.",
          "Handle office supplies and vendor management.",
        ],
        skills: [
          "Strong organizational and multitasking abilities.",
          "Excellent written and verbal communication.",
          "Proficiency in MS Office Suite (Word, Excel, Outlook).",
          "Attention to detail and problem-solving mindset.",
          "Ability to work independently and as part of a team.",
        ],
      },
      {
        title: "Promotions Coordinator",
        description:
          "At Khimji Ramdas we believe that our people are our greatest asset.",
        jobType: "Full Time",
        requirements: "Minimum 5 years of exp",
        responsibilities: [
          "Manage day-to-day administrative tasks and office operations",
          "Maintain records, filing systems, and documentation.",
          "Coordinate meetings, schedules, and communications.",
          "Assist HR and finance teams with clerical support.",
          "Handle office supplies and vendor management.",
        ],
        skills: [
          "Strong organizational and multitasking abilities.",
          "Excellent written and verbal communication.",
          "Proficiency in MS Office Suite (Word, Excel, Outlook).",
          "Attention to detail and problem-solving mindset.",
          "Ability to work independently and as part of a team.",
        ],
      },
    ],
  },
};

export default function page() {
  return (
    <>
      <InnerHero
        coverImage="/images/career_innerbanner.jpg"
        coverImageMobile="/images/career_innerbanner.jpg"
        alt="Career Banner"
        title="CAREERS"
        breadCrumb_data={[
          { link: { href: "/", label: "Home" } },
          { link: { href: "/career", label: "Careers" } },
        ]}
      />
      <CareerSection data={local_data?.career_section_data} />
    </>
  );
}
