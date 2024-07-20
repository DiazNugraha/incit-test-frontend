import Link from "next/link";
import Button from "../button";

interface NavbarProps {
  onLogout: () => void;
}

export default function Navbar(props: Readonly<NavbarProps>) {
  const { onLogout } = props;
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
      <div>
        <Button className="bg-slate-500" onClick={() => onLogout()}>
          Logout
        </Button>
      </div>
    </div>
  );
}
