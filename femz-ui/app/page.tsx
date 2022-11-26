"use client";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  if (user) {
    return (
      <div>
        <h1 className="text-3xl">Hello from the home page!</h1>
      </div>
    );
  } else {
    router.push("/login");
  }
}
