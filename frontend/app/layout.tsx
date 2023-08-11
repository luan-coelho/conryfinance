import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import React from "react";
import Header from "@/components/application/layout/header";
import RouteBack from "@/components/commons/route-back";
import { Sidebar } from "@/components/application/layout/sidebar/index";

export const metadata: Metadata = {
  title: "Conry Finance",
  description: "Aplicativo de Finanças mensais",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const TC = (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );

  return (
    <html lang="pt-br">
      <body>
        {TC}
        <Header />
        <div className="flex">
          <Sidebar.Root />
          <main className="w-full p-8">
            <RouteBack />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
