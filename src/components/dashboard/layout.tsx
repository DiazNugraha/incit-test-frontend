import { useRouter } from "next/router";
import Navbar from "./navbar";
import React from "react";
import { Identity } from "@/types/dashboard/dashboard";

interface DashboardLayoutProps {
  children: React.ReactNode;
  identity?: Identity;
}

const Layout: React.FC<DashboardLayoutProps> = ({ children, identity }) => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-slate-200/10 border-[1px] border-white/10 h-[80vh] w-[60vw] p-10 flex flex-col">
        <div className="flex w-full justify-center">
          <h1 className="text-2xl">Dashboard</h1>
        </div>
        <Navbar onLogout={handleLogout} identity={identity} />
        <hr className="w-full" />
        {children}
      </div>
    </main>
  );
};

export default Layout;
