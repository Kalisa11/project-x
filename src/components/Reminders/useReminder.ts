import { trpc } from "@/utils/trpc";

export const useReminder = () => {
  const { data, isLoading, error, refetch } =
    trpc.reminder.getReminders.useQuery();
  return { data, isLoading, refetch, error };
};
