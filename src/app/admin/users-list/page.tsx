import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UsersListTable from "@/components/tables/UsersListTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Users List | WIN CoE",
  description:
    "Users List",
  // other metadata
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Users List" />
      <div className="space-y-6">
        <UsersListTable />
      </div>
    </div>
  );
}
