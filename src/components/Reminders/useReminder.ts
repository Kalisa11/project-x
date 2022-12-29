import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

export const useReminder = () => {
  const { data, isLoading, error, refetch } =
    trpc.reminder.getReminders.useQuery();

  const deleteReminder = trpc.reminder.deleteReminder.useMutation({
    onSuccess: () => {
      toast.success("Deleted reminder", {
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
    deleteReminder,
  };
};
