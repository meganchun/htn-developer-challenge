"use client";
import { PreferencesContext } from "@/contexts/PreferencesContext";
import { Preferences } from "@/types/types";
import dayjs from "dayjs";
import { ReactNode, useEffect, useState } from "react";

export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<Preferences>(() => {
    // If stored data exists, use it
    if (typeof window !== "undefined") {
      const storedPrefs = localStorage.getItem("preferences");
      return storedPrefs
        ? JSON.parse(storedPrefs)
        : { eventType: "all", eventDate: dayjs("01-12-21") };
    }
    // Else return default settings
    return { eventType: "all", eventDate: dayjs("01-12-21") };
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("preferences", JSON.stringify(preferences));
    }
  }, [preferences]);

  return (
    <PreferencesContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};
