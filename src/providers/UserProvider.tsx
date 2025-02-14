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
    // Custom error handling for Next.js router errors
    const isNextRouterError = (error: any): boolean => {
      if (!error) return false;

      const routerErrorPatterns = [
        /next\/navigation/i,
        /router not initialized/i,
        /invalid route/i,
        /cannot navigate/i,
        /hydration error/i
      ];

      return routerErrorPatterns.some(pattern => 
        (error.message && pattern.test(error.message)) ||
        (error.stack && pattern.test(error.stack))
      );
    };

    // Save original console.error
    const originalConsoleError = window.console.error;

    // Custom console.error handler
    window.console.error = function() {
      const args = Array.from(arguments);
      if (!isNextRouterError(args[0])) {
        originalConsoleError.apply(window.console, args);
      }
    };

    // Global error event listener
    const errorHandler = (event: ErrorEvent) => {
      if (isNextRouterError(event.error)) {
        event.preventDefault();
        return false;
      }
    };

    window.addEventListener('error', errorHandler);

    // Cleanup function
    return () => {
      window.console.error = originalConsoleError;
      window.removeEventListener('error', errorHandler);
    };
  }, []);

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
