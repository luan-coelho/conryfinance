"use client";

import Header from "@/components/application/layout/header";
import RouteBack from "@/components/commons/route-back";
import { useLoading } from "@/contexts/request-loading-context";
import { useLayout } from "@/contexts/sidebar-context";
import { useAxiosInterceptor } from "../_axios-interceptor";
import Loading from "../loading";
import React from "react";

export default function Content({ children }: { children: React.ReactNode }) {
  const { sidebarIsOpen } = useLayout();
  const { loading } = useLoading();
  useAxiosInterceptor();

  return (
    <>
      <div className={`relative flex flex-col ${sidebarIsOpen ? "md:ml-[300px]" : "ml-0 md:ml-[80px]"}`}>
        <Header />
        <main className="my-[70px] p-8">
          <RouteBack />
          {loading && <Loading />}
          {children}
        </main>
      </div>
    </>
  );
}
