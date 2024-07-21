import Link from "next/link";
import Button from "../button";
import { Identity } from "@/types/dashboard/dashboard";

interface NavbarProps {
  onLogout: () => void;
  identity?: Identity;
}

export default function Navbar(props: Readonly<NavbarProps>) {
  const { onLogout, identity } = props;
  return (
    <div className="flex justify-between mb-2">
      <div className="flex gap-x-3">
        <Button className="bg-slate-500">
          <Link href={"/dashboard"}>Dashboard</Link>
        </Button>
        <Button className="bg-slate-500">
          <Link href={"/profile"}>Profile</Link>
        </Button>
      </div>
      <div className="flex gap-x-3">
        {identity && (
          <div className="flex flex-col">
            <p className="text-slate-200 text-sm">{identity.name}</p>
            <p className="text-slate-500 text-sm">{identity.email}</p>
          </div>
        )}
        <Button className="bg-slate-500" onClick={() => onLogout()}>
          Logout
        </Button>
      </div>
    </div>
  );
}
