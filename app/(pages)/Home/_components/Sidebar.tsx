"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { IoMdHome, IoMdPerson } from "react-icons/io";
import { FaFileContract } from "react-icons/fa6";

type PathProps = "home" | "update" | "profile" | "history";
function Sidebar() {
  const [path, setPath] = useState<PathProps>("home");
  const router = useRouter();

  const onClickPathChange = (path: PathProps) => {
    setPath(path);
    if (path === "home") {
      router.push(`/home`);
    } else {
      router.push(`/home/${path}`);
    }
  };

  return (
    <div className="h-screen overflow-hidden w-[20vw] border-r border-black flex flex-col py-12">
      <div
        onClick={() => onClickPathChange("home")}
        className={`h-auto w-full pl-11 ${path === "home" ? "bg-yellow" : ""}`}
      >
        <div className="border-t text-lg py-4 border-black w-full">
          <Link href={"/home"} className="flex justify-start items-center gap-2">
            <IoMdHome className="size-8"/> Home
          </Link>
        </div>
      </div>
      <div
        onClick={() => onClickPathChange("update")}
        className={`h-auto w-full pl-11 ${
          path === "update" ? "bg-yellow" : ""
        }`}
      >
        <div className="border-t text-lg py-4 border-black w-full">
          <Link href={"/home"} className="flex justify-start items-center gap-2" >
            <ImSpinner9 className="size-8" /> Update
          </Link>
        </div>
      </div>
      <div
        onClick={() => onClickPathChange("history")}
        className={`h-auto w-full pl-11 ${
          path === "history" ? "bg-yellow" : ""
        }`}
      >
        <div className="border-t text-lg py-4 border-black w-full">
          <Link href={"/home"} className="flex justify-start items-center gap-2" >
            <FaFileContract className="size-8" /> History
          </Link>
        </div>
      </div>
      <div
        onClick={() => onClickPathChange("profile")}
        className={`h-auto w-full pl-11 ${
          path === "profile" ? "bg-yellow" : ""
        }`}
      >
        <div className="border-y text-lg py-4 border-black w-full">
          <Link href={"/home"} className="flex justify-start items-center gap-2" >
            <IoMdPerson className="size-8" /> Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
