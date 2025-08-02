import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import NewsListTable from "@/components/tables/NewsListTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "News List | WIN CoE",
  description:
    "News List",
  // other metadata
};

export default function NewsTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="News List" />
      <div className="space-y-6">
        <NewsListTable />
      </div>
    </div>
  );
}
