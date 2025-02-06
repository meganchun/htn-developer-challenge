"use client";

import { useRouter } from "next/navigation";
import Image from 'next/image';
import styles from "./page.module.css"

export default function SignIn() {
  const router = useRouter();

  const handleSignIn = () => {
    // Add your authentication logic here
    // After successful sign in, redirect to home
    router.push("/");
  };

  return (
    <div className="min-h-screen flex bg-background">
      <div className="w-1/2 h-screen">
        <div className={styles.maskContainer}>
          <Image
            src="/img_5terre.jpg"
            alt="Cinque Terre"
            fill
            className={styles.image}
            priority
          />
          <div className={styles.gridMask}>
            {Array(16).fill(null).map((_, i) => (
              <div key={i} className="bg-white w-full h-full rounded" />
            ))}
          </div>
        </div>
      </div>
      <div className="w-1/2 h-screen flex items-center justify-center">
        <div className="p-8 w-96">
        <h1 className="text-2xl font-bold mb-6 text-start">Sign In</h1>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSignIn();
          }}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
      
    </div>
  );
}