import Button from "@/components/button";
import Layout from "@/components/dashboard/layout";
import ProfileLayout from "@/components/profile/profile-layout";
import TextField from "@/components/text-field";
import withAuth, { getServerSidePropsWithAuth } from "@/hoc/withAuth";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState<string>();
  const [nameErrMessage, setNameErrMessage] = useState<string>();
  const [userId, setUserId] = useState<number>();

  const checkName = (): boolean => {
    if (!name) {
      setNameErrMessage("Name is required");
      return true;
    }
    setNameErrMessage("");
    return false;
  };

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
        setName(res.name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isError = checkName();
    if (isError) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/change-name/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name }),
        }
      );

      if (response.ok) {
        alert("Profile updated successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      const id = Cookies.get("userId");
      if (id) {
        fetchProfile(Number(id));
        setUserId(Number(id));
      }
    }
  }, [router]);
  return (
    <Layout>
      <ProfileLayout>
        <div className="flex justify-center items-center h-full">
          <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center flex-col gap-8 w-[40%]"
          >
            <h1 className="text-4xl">Profile</h1>
            <div className="flex flex-col gap-y-4 w-full">
              <div className="flex flex-col">
                <TextField
                  label="Name"
                  value={name}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
                {nameErrMessage && (
                  <p className="text-red-500">{nameErrMessage}</p>
                )}
              </div>
            </div>
            <Button className="w-full bg-slate-500" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </ProfileLayout>
    </Layout>
  );
};

export const getServerSideProps = getServerSidePropsWithAuth;
export default withAuth(ProfilePage);
