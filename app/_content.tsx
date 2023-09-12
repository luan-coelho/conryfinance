"use client";

import Header from "@/components/application/layout/header";
import RouteBack from "@/components/commons/route-back";
import { useLoading } from "@/contexts/request-loading-context";
import { useSidebar } from "@/contexts/sidebar-context";
import { useAxiosInterceptor } from "./_axios-interceptor";
import Loading from "./loading";

export default function Content({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();
  const { loading } = useLoading();
  useAxiosInterceptor();

  return (
    <>
      <div className={`relative w-full flex flex-col ${isOpen ? "md:ml-[300px]" : "ml-0 md:ml-[80px]"}`}>
        <Header />
        <main className="mt-[70px] p-8">
          <RouteBack />
          {loading && <Loading />}
          {children}
        </main>
      </div>
    </>
  );
}
