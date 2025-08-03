// app/admin/news/page.tsx or similar

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import NewsListTable from "@/components/tables/NewsListTable";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "News List | WIN CoE",
  description: "News List",
};

export default async function NewsTables() {
  const cookieHeader = cookies().toString(); // get cookies for API auth

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/admin/news/list/?perPage=25`, {
    headers: {
      Cookie: cookieHeader,
    },
    cache: 'no-store',
  });
  const result = await res.json();
  const newsData = result?.data?.news || [];
  return (
    <div>
      <PageBreadcrumb pageTitle="News List" />
      <div className="space-y-6">
        <NewsListTable initialData={newsData} />
      </div>
    </div>
  );
}
