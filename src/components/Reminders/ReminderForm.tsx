import { Popover, Transition } from "@headlessui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Fragment } from "react";
import { useReminder } from "./useReminder";
import { Reminder } from "@prisma/client";
import { reminderSchema } from "@/schema/reminder";
import { yupResolver } from "@hookform/resolvers/yup";

export default function ReminderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Reminder>({ resolver: yupResolver(reminderSchema) });
  const { createReminder } = useReminder();

  const onSubmit: SubmitHandler<Reminder> = (data) => {
    reset();
    createReminder.mutateAsync({ ...data });
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
                          <label className="mb-3 block text-base font-medium text-[#07074D]">
                            <span className="text-gray-700">Title</span>
                            <input
                              type="text"
                              {...register("title", { required: true })}
                              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                          </label>
                          {errors.title && (
                            <span className="font-semibold text-red-600">
                              {errors.title?.message}{" "}
                            </span>
                          )}

                          <label className="mb-3 block text-base font-medium text-[#07074D]">
                            <span className="text-gray-700">Date </span>
                            <input
                              type="date"
                              onChange={(date: any) => {
                                setValue(
                                  "remindOn",
                                  new Date(date.target.value)
                                );
                              }}
                              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />

                            {errors.remindOn && (
                              <span className="font-semibold text-red-600">
                                {errors.remindOn?.message}{" "}
                              </span>
                            )}
                          </label>
                          <label className="mb-3 block text-base font-medium text-[#07074D]">
                            <span className="text-gray-700">Priority </span>
                            <select
                              {...register("priority", { required: true })}
                              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            >
                              <option>High</option>
                              <option>Medium</option>
                              <option>Low</option>
                            </select>
                            {errors.priority && (
                              <span className="font-semibold text-red-600">
                                {errors.priority?.message}{" "}
                              </span>
                            )}
                          </label>
                          <label className="mb-3 block text-base font-medium text-[#07074D]">
                            <span className="text-gray-700">Description</span>
                            <textarea
                              {...register("description", { required: true })}
                              className="m-2 w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                              rows={3}
                              defaultValue={""}
                            />
                            {errors.description && (
                              <span className="font-semibold text-red-600">
                                {errors.description?.message}
                              </span>
                            )}
                          </label>
                          <button
                            type="submit"
                            className="bg-[#6A64F1] py-3 px-4 text-base font-semibold text-white outline-none"
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
