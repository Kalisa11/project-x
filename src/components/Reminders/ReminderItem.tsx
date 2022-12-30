import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/outline";
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

const ReminderItem = ({ reminder }: { reminder: Reminder }) => {
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
          <div className="ml-3 mt-4 inline-flex items-center rounded-md shadow-sm">
            <Link href={`/reminder/update/${reminder.id}`}>
              <button className="inline-flex items-center space-x-1 rounded-l-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 hover:text-blue-600">
                <span>
                  <PencilSquareIcon className="h-4 w-4 text-gray-700" />
                </span>
              </button>
            </Link>

            <Link href={`/reminder/${reminder.id}`}>
              <button className="inline-flex items-center space-x-1 border-y border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 hover:text-blue-600">
                <span>
                  <EyeIcon className="h-4 w-4 text-gray-700" />
                </span>
              </button>
            </Link>

            <button
              onClick={() => {
                deleteReminder.mutate({ id: reminder.id });
              }}
              className="inline-flex items-center space-x-1 rounded-r-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 hover:text-blue-600"
            >
              <span>
                <TrashIcon className="h-4 w-4 text-gray-700" />
              </span>
            </button>
          </div>
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
        <div></div>
      </div>
    </div>
  );
};

export default ReminderItem;
