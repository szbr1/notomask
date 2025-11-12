"use client";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

function Header() {
  const { fetchUser, user } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return (
    <div className="flex justify-between items-center px-20 py-3">
      <Image src={"/logotext.svg"} height={180} width={180} alt="logo" />
      {/* Auth Page Links  */}
      {user ? (
        <div className="flex justify-center items-center gap-2">
          {user.image ? (
            <Image
              src={user.image}
              height={30}
              width={30}
              alt=""
              className="rounded-full"
            />
          ) : (
            <div className="size-8 rounded-full bg-yellow flex justify-center items-center">
              {user.name.charAt(0)}
            </div>
          )}
          <div className="text-lg">
            {user.name
              .toLowerCase() // make all letters lowercase
              .split(" ") // split into parts
              .map((part) => part.charAt(0).toUpperCase() + part.slice(1)) // capitalize first letter
              .join(" ")}
          </div>
        </div>
      ) : (
        <div className="flex justify-center gap-4 items-center">
          <Button asChild variant={"outline"}>
            <Link href="/auth/sign-in">Sign In</Link>
          </Button>
          <Button asChild className="bg-yellow hover:bg-yellow text-black">
            <Link href="/auth/sign-up">Sign Up</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default Header;
