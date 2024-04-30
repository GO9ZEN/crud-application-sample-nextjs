import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-blue-100 h-[100vh] flex items-center justify-center gap-8 md:flex-row flex-col">
      <Link href="/client-add">
        <Button className="bg-green-600">Add New Clients</Button>
      </Link>
      <Link href="/client-list">
        <Button className="bg-green-600">View Clients List</Button>
      </Link>
    </div>
  );
}
