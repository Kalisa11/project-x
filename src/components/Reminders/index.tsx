import React from "react";
import ReminderItem from "./ReminderItem";
import { useReminder } from "./useReminder";

const ReminderList = () => {
  const { data, isLoading, error } = useReminder();
  if (isLoading) {
    return <p className="font-bold text-white">Loading task list...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <ul>
      {data?.map((reminder) => (
        <ReminderItem key={reminder.id} reminder={reminder} />
      ))}
    </ul>
  );
};

export default ReminderList;
