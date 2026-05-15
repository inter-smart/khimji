import { notFound } from "next/navigation";
import BlogsSection from "./BlogsSection";
import { getData } from "@/lib/server/api";

export default async function VentureList({ lang }) {
  const { data, error } = await getData(
    `blog-list?per_page=${perPage}&page=${page}`,
    lang,
  );

  if (!data || error) {
    notFound();
  }

  const { blogs, pagination } = data;

  return (
    <BlogsSection
      blogs={blogs}
      paginationData={pagination}
      lang={lang}
      error={error}
    />
  );
}
