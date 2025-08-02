import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UsersListTable from "@/components/tables/UsersListTable";
import { Metadata } from "next";
import { cookies } from "next/headers"; // required for auth cookies

export const metadata: Metadata = {
  title: "Users List | WIN CoE",
  description: "Users List",
};

export default async function UsersTables() {
  const cookieHeader = cookies().toString();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/admin/users/list?perPage=25`, {
    headers: {
      Cookie: cookieHeader,
    },
    cache: 'no-store', // disables caching for fresh data
  });

  const result = await res.json();
  const usersData = result?.data?.customers || [];
  // console.log('result',usersData);
  return (
    <div>
      <PageBreadcrumb pageTitle="Users List" />
      <div className="space-y-6">
        <UsersListTable initialData={usersData} />
      </div>
    </div>
  );
}
