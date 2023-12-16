import React from "react";
import { FaTrash } from "react-icons/fa";

const UserSelect = ({
  setSave,
  handleAddMore,
  handleRemove,
  handleChange,
  userList,
  users,
}) => {
  return (
    <div className={`flex flex-col gap-3`}>
      {userList.map((elem, idx) => {
        return (
          <>
            <div key={idx} className={`relative grid grid-cols-4 gap-5`}>
              <select
                name={`user`}
                className={`select select-sm select-bordered focus:outline-none`}
                value={typeof elem.user === "string" ? elem.user : ""}
                onChange={(e) => handleChange(e, idx)}
              >
                <option value={``} selected disabled>
                  Select user id
                </option>
                {users.map((user) => (
                  <option key={user.id} value={JSON.stringify(user)}>
                    {user.id}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Name"
                className={`input input-sm input-bordered focus:outline-none`}
                value={
                  typeof elem.user === "string"
                    ? JSON.parse(elem.user).name
                    : ""
                }
                readOnly
                disabled
              />
              <input
                type="text"
                placeholder="Town"
                className={`input input-sm input-bordered focus:outline-none`}
                value={
                  typeof elem.user === "string"
                    ? JSON.parse(elem.user).town
                    : ""
                }
                readOnly
                disabled
              />
              <input
                type="text"
                placeholder="City"
                className={`input input-sm input-bordered focus:outline-none`}
                value={
                  typeof elem.user === "string"
                    ? JSON.parse(elem.user).city
                    : ""
                }
                readOnly
                disabled
              />
              {userList.length !== 1 && (
                <div
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs text-red-600 hover:text-green-600 cursor-pointer transition-colors duration-500`}
                  onClick={() => handleRemove(idx)}
                >
                  <FaTrash />
                </div>
              )}
            </div>
            <div className={`flex justify-between`}>
              {userList.length - 1 === idx ? (
                <button
                  type={`button`}
                  className="btn btn-sm bg-green-600 hover:bg-transparent text-white hover:text-green-600 !border-green-600 rounded normal-case w-fit"
                  onClick={() => setSave(true)}
                >
                  Save
                </button>
              ) : null}
              {userList.length - 1 === idx && userList.length < 4 && (
                <button
                  type="button"
                  onClick={handleAddMore}
                  className="btn btn-sm bg-green-600 hover:bg-transparent text-white hover:text-green-600 !border-green-600 rounded normal-case w-fit"
                >
                  Add more
                </button>
              )}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default UserSelect;
