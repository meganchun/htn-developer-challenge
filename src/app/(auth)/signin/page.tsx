"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "antd";
import styles from "./page.module.css";
import activityImage from "../../assets/activity.png";
import workshopImage from "../../assets/workshop.png";
import techTalkImage from "../../assets/tech_talk.png";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import { User } from "@/types/types";

export default function SignIn() {
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [status, setStatus] = useState<"error" | "warning" | undefined>(
    undefined
  );

  const userContext = useContext(UserContext);
  const { user, setUser } = userContext;

  const handleSignIn = () => {
    if (username === "hacker" && password === "htn2025") {
      const userData: User = { type: "Hacker" };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      router.push("/");
    } else {
      setStatus("error");
      alert("Invalid username or password");
    }
  };

  return (
    <div className="h-screen flex bg-background font-dmSans items-center justify-center">
      <div className="w-full sm:w-fit h-fit flex items-center justify-center">
        <div className="avatars-container w-0 sm:w-fit sm:px-16 md:w-96 h-96 flex flex-row bg-background-secondary m-6 rounded-2xl justify-center items-center gap-4">
          <Image
            src={activityImage}
            alt="activity-mascot"
            className="w-16 h-auto object-contain"
          />
          <Image
            src={workshopImage}
            alt="tech-talk-mascot"
            className="w-16 z-10 h-auto object-contain"
          />
          <Image
            src={techTalkImage}
            alt="workshop-mascot"
            className="w-16 z-10 h-auto object-contain"
          />
        </div>

        <div className="p-8 w-96">
          <h1 className="text-2xl font-bold mb-2 text-start">Sign In</h1>
          <h3 className="text-sm font-medium mb-6 text-text-secondary text-start">
            A world of new adventures is just a login away...
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-text-secondary">
              Username
            </label>
            <Input
              type="username"
              className="w-full p-2 border border-text-secondary bg-background rounded focus:outline-none focus:ring-1 focus:ring-blue"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              status={status}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-2 text-text-secondary"
              htmlFor="password"
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              className="w-full border border-text-secondary bg-background p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              status={status}
            />
          </div>
          <button
            type="submit"
            className="w-full border border-blue rounded text-blue p-2 hover:bg-blue hover:text-white duration-200"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
