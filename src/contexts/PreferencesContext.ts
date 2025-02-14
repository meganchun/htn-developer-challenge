import { Preferences } from "@/types/types";
import { createContext, useState, useEffect, ReactNode } from "react";
import dayjs from 'dayjs'; 

export type PreferencesContextType = {
  preferences: Preferences;
  setPreferences: (prefs: Preferences) => void;
};

export const PreferencesContext = createContext<PreferencesContextType>({
  preferences: { eventType: "all", eventDate: dayjs("01-12-21") },
  setPreferences: () => {},
});