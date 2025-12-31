import React from 'react';
import { IoClose } from 'react-icons/io5';

function SeeUserData({ UserDiv, setUserDiv, UserDivData }) {
  return (
    <div
      className={`${UserDiv} top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50 transition-all duration-300`}
    >
      {/* Modal box */}
      <div className="bg-white dark:bg-zinc-800 w-11/12 md:w-1/3 p-6 rounded-2xl shadow-lg relative">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
          onClick={() => setUserDiv("hidden")}
        >
          <IoClose />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-zinc-200">
          User Information
        </h2>

        <div className="space-y-3">
          <div>
            <span className="font-medium text-gray-600 dark:text-gray-400">Username: </span>
            <span className="text-gray-800 dark:text-zinc-200">{UserDivData.username}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600 dark:text-gray-400">Email: </span>
            <span className="text-gray-800 dark:text-zinc-200">{UserDivData.email}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600 dark:text-gray-400">Address: </span>
            <span className="text-gray-800 dark:text-zinc-200">{UserDivData.address}</span>
          </div>
        </div>

        {/* Optional Footer / Info */}
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          This information is private and confidential.
        </p>
      </div>
    </div>
  );
}

export default SeeUserData;
