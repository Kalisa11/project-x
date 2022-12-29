import { Popover, Transition } from "@headlessui/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Fragment } from "react";
import { trpc } from "@/utils/trpc";
import toast from "react-hot-toast";

import { useReminder } from "./useReminder";

type Reminder = {
  title: string;
  remindOn: Date;
  priority: string;
  description: string;
};

export default function CreateReminder() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Reminder>();
  const { refetch } = useReminder();
  const { mutateAsync } = trpc.reminder.createReminder.useMutation({
    onSuccess: () => {
      toast.success("Reminder created", {
        position: "top-center",
      });
      refetch();
    },
  });

  const onSubmit: SubmitHandler<Reminder> = (data) => {
    reset();
    mutateAsync({ ...data });
  };
  return (
    <div className="fixed top-16 w-full max-w-sm px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md bg-gray-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span>Create Reminder</span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-opacity-5">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="items-center justify-center">
                      <div className="mt-8 max-w-md">
                        <div className="grid grid-cols-1 gap-6">
                          <label className="block">
                            <span className="text-gray-700">Title</span>
                            <input
                              type="text"
                              {...register("title", { required: true })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                          </label>
                          {errors.title && (
                            <span className="font-semibold text-red-600">
                              This field is required
                            </span>
                          )}

                          <label className="block">
                            <span className="text-gray-700">Date </span>
                            <input
                              type="date"
                              onChange={(date: any) => {
                                setValue(
                                  "remindOn",
                                  new Date(date.target.value)
                                );
                              }}
                              placeholder="Expense date"
                              className="mt-2 h-10 w-64 items-center  rounded-lg border border-teal-300 pl-2 text-gray-600 focus:border focus:border-indigo-700 focus:outline-none"
                            />

                            {errors.remindOn && (
                              <span className="font-semibold text-red-600">
                                This field is required
                              </span>
                            )}
                          </label>
                          <label className="block">
                            <span className="text-gray-700">Priority </span>
                            <select
                              {...register("priority", { required: true })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                              <option>High</option>
                              <option>Medium</option>
                              <option>Low</option>
                            </select>
                            {errors.priority && (
                              <span className="font-semibold text-red-600">
                                This field is required
                              </span>
                            )}
                          </label>
                          <label className="mb-4 block">
                            <span className="text-gray-700">Description</span>
                            <textarea
                              {...register("description", { required: true })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              rows={3}
                              defaultValue={""}
                            />
                            {errors.description && (
                              <span className="font-semibold text-red-600">
                                This field is required
                              </span>
                            )}
                          </label>
                          <button
                            type="submit"
                            className="rounded-sm text-teal-400"
                          >
                            ADD
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
