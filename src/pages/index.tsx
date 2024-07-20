import Button from "@/components/button";
import TextField from "@/components/text-field";
import { SignInPayload } from "@/types/registration/registration";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

interface HomePageProps {
  isLoggedIn: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isLoggedIn }) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [emailErrMessage, setEmailErrMessage] = useState<string>();
  const [passwordErrMessage, setPasswordErrMessage] = useState<string>();

  const checkEmail = () => {
    if (!email) {
      setEmailErrMessage("Email is required");
    } else {
      setEmailErrMessage("");
    }
  };

  const checkPassword = () => {
    if (!password) {
      setPasswordErrMessage("Password is required");
    } else {
      setPasswordErrMessage("");
    }
  };

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkEmail();
    checkPassword();

    const payload: SignInPayload = {
      email: String(email),
      password: String(password),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnOauth = (type: "google" | "facebook") => {
    if (typeof window !== "undefined") {
      window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${type}`;
    }
  };

  useEffect(() => {
    if (isLoggedIn && typeof window !== "undefined") {
      router.replace("/dashboard");
    }
  }, [isLoggedIn]);

  return (
    <main
      className={`relative flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="bg-slate-200/10 border-[1px] border-white/10 h-[80vh] w-[60vw] p-10 flex justify-center">
        <form
          onSubmit={signIn}
          className="flex justify-center items-center flex-col gap-8 w-[40%]"
        >
          <h1 className="text-4xl">Login</h1>
          <div className="flex flex-col gap-y-4 w-full">
            <div className="flex flex-col">
              <TextField
                label="Email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailErrMessage && (
                <p className="text-red-500 text-sm">{emailErrMessage}</p>
              )}
            </div>

            <div className="flex flex-col">
              <TextField
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordErrMessage && (
                <p className="text-red-500 text-sm">{passwordErrMessage}</p>
              )}
            </div>
          </div>
          <Button className="w-full bg-slate-500" type="submit">
            Sign In
          </Button>
          <div className="flex gap-3">
            <Button
              className="bg-slate-500"
              onClick={() => handleOnOauth("google")}
            >
              Gmail
            </Button>
            <Button
              className="bg-slate-500"
              onClick={() => handleOnOauth("facebook")}
            >
              Facebook
            </Button>
            <Button className="bg-slate-500">
              <a href="/sign-up">Sign Up</a>
            </Button>
          </div>
        </form>
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

export default HomePage;
