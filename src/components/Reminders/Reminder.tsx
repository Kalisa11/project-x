import { TrashIcon } from "@heroicons/react/24/outline";
import React from "react";

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

const Reminder = ({ data }: { data: Reminder }) => {
  return (
    <div className=" flex items-center  justify-between rounded-lg  bg-white p-4 shadow-md shadow-indigo-50">
      <div>
        <h2 className="text-lg font-bold text-gray-900">{data.title}</h2>
        <h3 className="mt-2 text-left text-xl font-bold text-green-500">
          {data.description}
        </h3>
        <p className="text-sm font-semibold text-gray-400">
          {data.createdAt.toLocaleDateString()}
        </p>
        <button className="font-laonoto mt-6 rounded-lg bg-[#304FFE] px-4  py-2 text-sm tracking-wider text-white outline-none hover:bg-indigo-500">
          VIEW
        </button>
        <button className="font-laonoto mt-6 ml-4 rounded-lg bg-red-600 px-4 py-2 text-sm tracking-wider text-white outline-none hover:bg-red-400">
          <TrashIcon className="h-4 w-4 text-white" />
        </button>
      </div>
      <div className="flex h-32 w-32 items-center justify-center  rounded-full border-2 border-dashed border-white  bg-gradient-to-tr from-blue-600  to-indigo-600 shadow-2xl shadow-[#304FFE] ">
        <div>
          <h1 className="text-2xl text-white">{data.priority}</h1>
        </div>
      </div>
    </div>
  );
};

export default Reminder;
