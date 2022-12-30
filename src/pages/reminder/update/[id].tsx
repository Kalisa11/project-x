import { trpc } from "@/utils/trpc";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import type { Reminder } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { reminderSchema } from "@/schema/reminder";
import { useReminder } from "@/components/Reminders/useReminder";
import { Layout } from "@/components/Layout";

const UpdateReminder = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, isLoading } = trpc.reminder.getSingleReminder.useQuery({
    id,
  });
  const { updateReminder } = useReminder();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Reminder>({ resolver: yupResolver(reminderSchema) });

  const onSubmit: SubmitHandler<Reminder> = (data) => {
    updateReminder.mutateAsync({
      id: id,
      title: data.title,
      description: data.description,
      remindOn: data.remindOn,
      priority: data.priority,
    });
    router.push("/");
  };
  if (isLoading) {
    return <Layout title="Update task">Loading...</Layout>;
  }
  if (data) {
    return (
      <Layout title="Update reminder">
        <div className="flex items-center justify-center p-12">
          <div className="mx-auto w-full max-w-[550px]">
            <Link href={`/`}>
              <ArrowLeftIcon className="mt-3 h-6 w-6 cursor-pointer text-blue-600" />
            </Link>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Title{" "}
                </label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  defaultValue={data?.title}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                {errors.title && (
                  <span className="font-semibold text-red-600">
                    {errors.title?.message}{" "}
                  </span>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Remind On{" "}
                </label>
                <input
                  type="date"
                  onChange={(date: any) => {
                    setValue("remindOn", new Date(date.target.value));
                  }}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                {errors.remindOn && (
                  <span className="font-semibold text-red-600">
                    {errors.remindOn?.message}{" "}
                  </span>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="subject"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Priority
                </label>
                <select
                  {...register("priority", { required: true })}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  defaultValue={data.priority}
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
              </div>
              <div className="mb-5">
                <label
                  htmlFor="message"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Description
                </label>
                <textarea
                  {...register("description", { required: true })}
                  placeholder="Type your message"
                  defaultValue={data?.description}
                  className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                {errors.description && (
                  <span className="font-semibold text-red-600">
                    {errors.description?.message}
                  </span>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                >
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    );
  }
};

export default UpdateReminder;
