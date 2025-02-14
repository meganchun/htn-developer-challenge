"use client";
import { UserContext } from "@/contexts/UserContext";
import { User } from "@/types/types";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}
export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>(() => {
    // If stored data exists, use it
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : { type: "Guest" };
    }
    // Else return guest user
    return { type: "Guest" };
  });
  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem("user", JSON.stringify(user || { type: "Guest" }));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
