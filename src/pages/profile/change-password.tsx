import Button from "@/components/button";
import Layout from "@/components/dashboard/layout";
import ProfileLayout from "@/components/profile/profile-layout";
import TextField from "@/components/text-field";
import withAuth, { getServerSidePropsWithAuth } from "@/hoc/withAuth";
import { ChangePasswordPayload } from "@/types/profile/profile";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const ChangePasswordPage: React.FC = () => {
  const [oldPassword, setOldPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [retypePassword, setRetypePassword] = useState<string>();
  const [newPasswordErrMessage, setNewPasswordErrMessage] = useState<string>();
  const [retypePasswordErrMessage, setRetypePasswordErrMessage] =
    useState<string>();

  const [userId, setUserId] = useState<number>();

  const checkNewPassword = (): boolean => {
    if (!newPassword) {
      setNewPasswordErrMessage("Password is required");
      return true;
    }
    const checks = {
      hasLowerCase: /[a-z]/.test(newPassword),
      hasUpperCase: /[A-Z]/.test(newPassword),
      hasDigit: /\d/.test(newPassword),
      hasSpecialChar: /[@$!%*?&]/.test(newPassword),
      hasMinLength: newPassword.length >= 8,
    };
    const errors = [
      {
        check: !checks.hasLowerCase,
        message: "Password must contain at least one lowercase letter",
      },
      {
        check: !checks.hasUpperCase,
        message: "Password must contain at least one uppercase letter",
      },
      {
        check: !checks.hasDigit,
        message: "Password must contain at least one digit",
      },
      {
        check: !checks.hasSpecialChar,
        message: "Password must contain at least one special character",
      },
      {
        check: !checks.hasMinLength,
        message: "Password must be at least 8 characters long",
      },
    ];

    for (const error of errors) {
      if (error.check) {
        setNewPasswordErrMessage(error.message);
        return true;
      }
    }

    setNewPasswordErrMessage("");
    return false;
  };

  const checkRetypePassword = (): boolean => {
    if (!retypePassword) {
      setRetypePasswordErrMessage("Retype Password is required");
      return true;
    }
    if (retypePassword !== newPassword) {
      setRetypePasswordErrMessage("Password does not match");
      return true;
    }
    setRetypePasswordErrMessage("");
    return false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isError = false;
    for (const check of [checkNewPassword, checkRetypePassword]) {
      isError = check();
      if (isError) {
        isError = true;
      }
    }

    if (isError) return;

    try {
      const payload: ChangePasswordPayload = {
        oldPassword: oldPassword ?? null,
        newPassword: String(newPassword),
        retypePassword: String(retypePassword),
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/change-password/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );
      if (response.ok) {
        alert("Password changed successfully");
        window.location.href = "/profile";
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const id = Cookies.get("userId");
    if (id) {
      setUserId(Number(id));
    }
  }, []);

  return (
    <Layout>
      <ProfileLayout>
        <div className="flex justify-center items-center h-full">
          <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center flex-col gap-8 w-[40%]"
          >
            <h1 className="text-4xl">Change Password</h1>
            <div className="flex flex-col gap-y-4 w-full">
              <div className="flex flex-col">
                <TextField
                  label="Old Password"
                  value={oldPassword}
                  type="password"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <TextField
                  label="New Password"
                  value={newPassword}
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {newPasswordErrMessage && (
                  <p className="text-red-500 text-sm">
                    {newPasswordErrMessage}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <TextField
                  label="Retype Password"
                  value={retypePassword}
                  type="password"
                  onChange={(e) => setRetypePassword(e.target.value)}
                />
                {retypePasswordErrMessage && (
                  <p className="text-red-500 text-sm">
                    {retypePasswordErrMessage}
                  </p>
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

export default withAuth(ChangePasswordPage);
