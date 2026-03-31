import BlogsSection from "./BlogsSection";
import { getData } from "@/lib/server/api";

export default async function BlogList({ lang, searchParams, variant }) {
  const perPage = parseInt(searchParams?.perPage) || 12;
  const page = parseInt(searchParams?.page) || 1;

  const { data, error } = await getData(`blog-list?per_page=${perPage}&page=${page}`, lang);

  if (!data || error) {
    return <div>Error loading data</div>;
  }

  const { blogs, pagination } = data;

  return <BlogsSection blogs={blogs} paginationData={pagination} lang={lang} variant={variant} error={error} />;
}
