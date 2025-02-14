import { User } from "@/types/types";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

interface Props {
  user: User;
  setUser: (user: User) => void;
}

export default function NavBar({ user, setUser }: Props) {
  const navRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        gsap.to(navRef.current, {
          y: "-175%",
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        gsap.to(navRef.current, {
          y: "0%",
          duration: 0.5,
          ease: "power2.out",
        });
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 transform w-full bg-white/50 backdrop-blur-md text-white z-50"
    >
      <div className="flex justify-between  py-5 px-16 text-sm items-center">
        <a href="#header" className="hover:text-gray-400">
          Home
        </a>
        <div className="flex gap-10 hidden sm:inline">
          <a href="#schedule" className="hover:text-gray-400 px-2">
            Schedule
          </a>
          <a href="#faq" className="hover:text-gray-400 px-2">
            FAQ
          </a>
          <a href="#contactUs" className="hover:text-gray-400 px-2">
            Contact Us
          </a>
        </div>
        <button
          onClick={() => {
            user.type === "Guest"
              ? router.push("/signin")
              : setUser({ type: "Guest" });
          }}
          className="hover:bg-blue border px-3 py-1 border-blue rounded-full cursor-pointer duration-200"
        >
          {user?.type === "Hacker" ? (
            <h3 className="text-blue hover:text-white duration-200">
              Sign Out
            </h3>
          ) : (
            <h3 className="text-blue hover:text-white duration-200">Sign In</h3>
          )}
        </button>
      </div>
    </nav>
  );
}
