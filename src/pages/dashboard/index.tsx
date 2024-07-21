import Layout from "@/components/dashboard/layout";
import withAuth, { getServerSidePropsWithAuth } from "@/hoc/withAuth";
import React from "react";

const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <div>dashboard</div>
    </Layout>
  );
};

export const getServerSideProps = getServerSidePropsWithAuth;
export default withAuth(DashboardPage);
