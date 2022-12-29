import { TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { useReminder } from "./useReminder";

type Reminder = {
  id: string;
  title: string;
  description: string;
  remindOn: Date;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

const Reminder = ({ reminder }: { reminder: Reminder }) => {
  const { deleteReminder } = useReminder();
  return (
    <div className="h-30 mx-auto mb-0.5 rounded-sm border border-gray-500 bg-gray-100 text-gray-700">
      <div
        className={`flex border-l-8 ${
          reminder.priority === "Medium"
            ? "border-yellow-600"
            : reminder.priority === "Low"
            ? "border-green-600"
            : "border-red-600"
        } p-3`}
      >
        <div className="space-y-1 border-r-2 pr-3">
          <div className="text-sm font-semibold leading-5">
            <span className="text-xs font-normal leading-4 text-gray-500">
              Id #
            </span>{" "}
            {reminder.id}
          </div>
          <div className="text-sm font-semibold leading-5">
            <span className="pr text-xs font-normal leading-4 text-gray-500">
              BOL #
            </span>{" "}
            10937
          </div>
          <div className="text-sm font-semibold leading-5">
            <span className="text-xs font-normal leading-4 text-gray-500">
              Due # {""}
            </span>
            {reminder.remindOn.toDateString()}{" "}
          </div>
        </div>
        <div className="flex-1">
          <div className="ml-3 space-y-1 border-r-2 pr-3">
            <div className="text-base font-bold leading-6">
              {reminder.title.toLocaleUpperCase()}{" "}
            </div>
            <div className="text-sm font-normal leading-4">
              <span className="text-xs font-normal leading-4 text-gray-500">
                {" "}
                Created On:
              </span>{" "}
              {reminder.createdAt.toDateString()}{" "}
            </div>
            <div className="text-sm font-normal leading-4">
              <span className="text-xs font-normal leading-4 text-gray-500">
                {" "}
                Description:
              </span>{" "}
              {reminder.description}{" "}
            </div>
          </div>
        </div>
        <div className="border-r-2 pr-3">
          <button
            onClick={() => {
              deleteReminder.mutate({ id: reminder.id });
            }}
          >
            <div className="mt-5 ml-3 border-2 rounded-md border-red-500 bg-orange-500 p-1 hover:bg-orange-300">
              <TrashIcon className=" h-4 w-4 text-white" />
            </div>
          </button>
        </div>
        <div>
          <div
            className={`my-5 ml-3 w-20 ${
              reminder.priority === "Medium"
                ? "bg-yellow-600"
                : reminder.priority === "Low"
                ? "bg-green-600"
                : "bg-red-600"
            } p-1`}
          >
            <div className="text-center text-xs font-semibold uppercase leading-4 text-yellow-100">
              {reminder.priority.toLocaleUpperCase()}
            </div>
          </div>
        </div>
        <div>
          <Link href={`/reminder/${reminder.id}`}>
            <button className="my-5 ml-2 rounded-sm bg-gray-500 text-gray-100 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Reminder;
