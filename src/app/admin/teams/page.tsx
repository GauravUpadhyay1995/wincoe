// app/admin/news/page.tsx or similar

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TeamsListTable from "@/components/tables/TeamsListTable";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Teams List | WIN CoE",
  description: "Teams List",
};

export default async function NewsTables() {
  const cookieHeader = cookies().toString(); // get cookies for API auth

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/list`, {
    headers: {
      Cookie: cookieHeader,
    },
    cache: 'no-store',
  });
  const result = await res.json();
  const teamsData = result?.data?.teams || [];
    // console.log('>>>>>>>>>>',teamsData);  
  return (
    <div>
      <PageBreadcrumb pageTitle="Teams List" />
      <div className="space-y-6">
        <TeamsListTable initialData={teamsData} />
      </div>
    </div>
  );
}
