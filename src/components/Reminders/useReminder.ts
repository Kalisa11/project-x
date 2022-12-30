import { trpc } from "@/utils/trpc";
import { toast } from "react-hot-toast";

export const useReminder = () => {
  const { data, isLoading, error, refetch } =
    trpc.reminder.getReminders.useQuery();

  const createReminder = trpc.reminder.createReminder.useMutation({
    onSuccess: () => {
      toast.success("Reminder created ", {
        position: "top-center",
      });
      refetch();
    },
  });

  const deleteReminder = trpc.reminder.deleteReminder.useMutation({
    onSuccess: () => {
      toast.success("Reminder deleted ", {
        position: "top-center",
      });
      refetch();
    },
  });

  const updateReminder = trpc.reminder.updateReminder.useMutation({
    onSuccess: () => {
      toast.success("Reminder updated", {
        position: "top-center",
      });
      refetch();
    },
  });

  return {
    data,
    isLoading,
    refetch,
    error,
    createReminder,
    deleteReminder,
    updateReminder,
  };
};
