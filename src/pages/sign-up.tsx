import Button from "@/components/button";
import TextField from "@/components/text-field";
import { SignUpPayload } from "@/types/registration/registration";
import { useState } from "react";

export default function SignUpPage() {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [retypePassword, setRetypePassword] = useState<string>();
  const [nameErrMessage, setNameErrMessage] = useState<string>();
  const [emailErrMessage, setEmailErrMessage] = useState<string>();
  const [passwordErrMessage, setPasswordErrMessage] = useState<string>();
  const [retypePasswordErrMessage, setRetypePasswordErrMessage] =
    useState<string>();

  const checkName = () => {
    if (!name) {
      setNameErrMessage("Name is required");
      return;
    }
    setNameErrMessage("");
  };

  const checkEmail = () => {
    if (!email) {
      setEmailErrMessage("Email is required");
      return;
    }
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailPattern.test(email)) {
      setEmailErrMessage("Invalid email address");
      return;
    }
    setEmailErrMessage("");
  };

  const checkPassword = () => {
    if (!password) {
      setPasswordErrMessage("Password is required");
      return;
    }
    const checks = {
      hasLowerCase: /[a-z]/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
      hasDigit: /\d/.test(password),
      hasSpecialChar: /[@$!%*?&]/.test(password),
      hasMinLength: password.length >= 8,
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
        setPasswordErrMessage(error.message);
        return;
      }
    }

    setPasswordErrMessage("");
  };

  const checkRetypePassword = () => {
    if (!retypePassword) {
      setRetypePasswordErrMessage("Retype Password is required");
      return;
    }
    if (retypePassword !== password) {
      setRetypePasswordErrMessage("Password does not match");
      return;
    }
    setRetypePasswordErrMessage("");
  };
  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkName();
    checkEmail();
    checkPassword();
    checkRetypePassword();
    try {
      const payload: SignUpPayload = {
        name: String(name),
        email: String(email),
        password: String(password),
        retypePassword: String(retypePassword),
      };
      console.log(payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main
      className={`relative flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="bg-slate-200/10 border-[1px] border-white/10 h-[80vh] w-[60vw] p-10 flex justify-center">
        <div className="flex justify-center items-center flex-col gap-8 w-[40%]">
          <h1 className="text-4xl">Sign Up</h1>
          <form onSubmit={signUp} className="flex flex-col gap-y-4 w-full">
            <div className="flex flex-col">
              <TextField
                label="Name"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
              {nameErrMessage && (
                <p className="text-red-500 text-sm">{nameErrMessage}</p>
              )}
            </div>
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
            <div className="flex flex-col">
              <TextField
                label="Retype Password"
                type="password"
                onChange={(e) => setRetypePassword(e.target.value)}
              />
              {retypePasswordErrMessage && (
                <p className="text-red-500 text-sm">
                  {retypePasswordErrMessage}
                </p>
              )}
            </div>
            <Button className="w-full bg-slate-500 mt-3" type="submit">
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
