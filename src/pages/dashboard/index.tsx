import Navbar from "@/components/dashboard/navbar";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface DashboardPageProps {
  isLoggedIn: boolean;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ isLoggedIn }) => {
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

  useEffect(() => {
    if (!isLoggedIn && typeof window !== "undefined") {
      router.replace("/");
    }
  }, [isLoggedIn]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-slate-200/10 border-[1px] border-white/10 h-[80vh] w-[60vw] p-10 flex flex-col">
        <div className="flex w-full justify-center">
          <h1 className="text-2xl">Dashboard</h1>
        </div>
        <Navbar onLogout={handleLogout} />
        <hr className="w-full" />
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const refreshToken = req.headers.cookie?.split(";")[0].split("=")[1];

    return {
      props: {
        isLoggedIn: !!refreshToken,
      },
    };
  } catch (error) {
    return {
      props: {
        isLoggedIn: false,
      },
    };
  }
};

export default DashboardPage;
