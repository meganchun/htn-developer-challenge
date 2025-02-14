import { PreferencesContext } from "@/contexts/PreferencesContext";
import { Preferences } from "@/types/types";
import { Select } from "antd";
import Search from "antd/es/input/Search";
import React, { useContext, useState } from "react";

interface Props {
  onSearch: (search: string) => void;
  preferences: Preferences;
  setPreferences: (preferences: Preferences) => void;
}
export default function EventFilters({ onSearch, preferences, setPreferences }: Props) {

  return (
    <div className="w-full flex flex-wrap gap-5 md:gap-x-10">
      <Search
        placeholder="Search Events"
        onSearch={onSearch}
        onChange={(value) => onSearch(value.target.value)}
        className="w-full sm:w-1/2"
        style={{
          backgroundColor: "var(--background-secondary)",
          borderRadius: "10px",
        }}
      />
      <Select
        dropdownStyle={{
          color: "var(--background-secondary)",
          backgroundColor: "var(--background-secondary)",
        }}
        value={preferences.eventType}
        onChange={(value: Preferences["eventType"]) => {
          setPreferences({ ...preferences, eventType: value });
        }}
        className="w-full sm:w-1/5"
      >
        <Select.Option value="all">All</Select.Option>
        <Select.Option value="workshop">Workshop</Select.Option>
        <Select.Option value="tech_talk">Tech Talk</Select.Option>
        <Select.Option value="activity">Activity</Select.Option>
      </Select>
    </div>
  );
}
