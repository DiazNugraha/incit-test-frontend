import Layout from "@/components/dashboard/layout";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface DashboardPageProps {
  isLoggedIn: boolean;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ isLoggedIn }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn && typeof window !== "undefined") {
      router.replace("/");
    }
  }, [isLoggedIn]);

  return (
    <Layout>
      <div>dashboard</div>
    </Layout>
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
