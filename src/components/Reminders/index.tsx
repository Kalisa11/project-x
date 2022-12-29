import { trpc } from "@/utils/trpc";
import React from "react";
import Reminder from "./Reminder";
import { useReminder } from "./useReminder";

const ReminderList = () => {
  const { data, isLoading, error } = useReminder();
  if (isLoading) {
    return <p>Loading task list...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <ul>
      {data?.map((reminder) => (
        <Reminder key={reminder.id} data={reminder} />
      ))}
    </ul>
  );
};

export default ReminderList;
