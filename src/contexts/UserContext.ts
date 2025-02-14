import { User } from "@/types/types";
import { createContext } from "react";

export type UserContextType = {
    user: User;
    setUser: (user: User) => void;
};

const currUser: User = { type: "Guest"};
  
export const UserContext = createContext<UserContextType>({
    user: currUser,
    setUser: () => {},
  });