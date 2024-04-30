"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="flex w-full md:h-16 h-12 items-center bg-black text-white flex-wrap">
      <div className="flex w-full justify-between md:ml-[50px] ml-[30px] md:mr-[50px] mr-[30px]">
        <Link href="/">
          <div className="flex gap-2 md:text-xl text-lg font-bold">
            <h1 className="text-red-500">PORTFOLIO</h1>
            <h1 className="text-blue-500">APP</h1>
          </div>
        </Link>

        <div className="hidden md:flex gap-12 md:text-lg text-base font-semibold">
          <Link href="/client-add">
            <h1>Add</h1>
          </Link>
          <Link href="/client-list">
            <h1>View List</h1>
          </Link>
        </div>

        <div className="md:hidden flex gap-12 md:text-lg text-base font-semibold">
          <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
      {isOpen && (
        <div className="absolute mt-[180px] p-[30px] w-full bg-slate-950">
          <div className="flex items-center justify-center flex-col gap-6">
            <Link href="/client-add">
              <h1>Add</h1>
            </Link>
            <Link href="/client-list">
              <h1>View List</h1>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
