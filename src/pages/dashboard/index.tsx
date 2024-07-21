import Layout from "@/components/dashboard/layout";
import withAuth, { getServerSidePropsWithAuth } from "@/hoc/withAuth";
import { Identity, Statistic, User } from "@/types/dashboard/dashboard";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const DashboardPage: React.FC = () => {
  const router = useRouter();

  const [userStats, setUserStats] = useState<Statistic>();
  const [users, setUsers] = useState<User[]>();
  const [identity, setIdentity] = useState<Identity>();

  const fetchProfile = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const res = await response.json();
        setIdentity({
          name: res.name,
          email: res.email,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserList = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/user-list`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const res = await response.json();
        setUsers(res.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserStatistics = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/user-statistics`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const res = await response.json();
        setUserStats(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchUserList();
      fetchUserStatistics();
      const id = Cookies.get("userId");
      if (id) {
        fetchProfile(Number(id));
      }
    }
  }, [router]);

  return (
    <Layout identity={identity}>
      <div className="flex flex-col gap-4 w-full h-[60%] overflow-y-scroll">
        <div className="flex justify-around mt-4">
          <div className="flex flex-col items-center justify-center h-[100px] rounded-xl w-[200px] bg-slate-700/40 p-3">
            <p>Users</p>
            <p>{userStats?.userCount}</p>
          </div>
          <div className="flex flex-col items-center justify-center h-[100px] rounded-xl w-[200px] bg-slate-700/40 p-3">
            <p>Active Session Users</p>
            <p>{userStats?.activeUserCount}</p>
          </div>
          <div className="flex flex-col items-center justify-center h-[100px] rounded-xl w-[200px] bg-slate-700/40 p-3">
            <p>Average user in a week</p>
            <p>{userStats?.averageActiveUserCount}</p>
          </div>
        </div>
        <div className="relative overflow-x-auto">
          <table className="overflow-hidden w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Sign Up At
                </th>
                <th scope="col" className="px-6 py-3">
                  Login Count
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Login
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr
                  key={user.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.name}
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    {new Date(user.createdAt).toDateString()}
                  </td>
                  <td className="px-6 py-4">{user.loginCount}</td>
                  <td className="px-6 py-4">
                    {new Date(user.lastLogoutAt).toDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = getServerSidePropsWithAuth;
export default withAuth(DashboardPage);
