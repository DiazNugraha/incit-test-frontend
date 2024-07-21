import Link from "next/link";
import Button from "../button";

export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full h-full flex flex-col mt-2">
      <div className="flex gap-x-2 mb-2">
        <Button className="bg-slate-500">
          <Link href={"/profile"}>Profile</Link>
        </Button>
        <Button className="bg-slate-500">
          <Link href={"/profile/change-password"}>Change Password</Link>
        </Button>
      </div>
      <hr className="w-full" />
      <div className="w-full h-full z-10">{children}</div>
    </div>
  );
}
