import React, { useEffect, useState } from "react";

const UserSelect = ({
  targetSelect,
  handleUsersFromSelect,
  handleDeleteUsersFromSelect,
  isReFetchIdx,
  usersFromSelect,
  usersFromSelectDisabled,
  setUsersFromSelectDisabled,
  users,
}) => {
  const [idx, setIdx] = useState(null);
  const [prevUID, setPrevUID] = useState(null);

  const handleUsersFromSelectDisabled = (userId) => {
    if (prevUID) {
      const arr = [...usersFromSelectDisabled];

      const userFromSelectDisabledIdx = arr.findIndex(
        (userFromSelectDisabled) => userFromSelectDisabled === prevUID,
      );

      arr.splice(userFromSelectDisabledIdx, 1, userId);
      setUsersFromSelectDisabled(arr);
    } else {
      setUsersFromSelectDisabled((prev) => [...prev, userId]);
    }

    !prevUID ? setPrevUID(userId) : null;
  };

  useEffect(() => {
    if (usersFromSelect.length) {
      const userFromSelectIdx = usersFromSelect.findIndex(
        (userFromSelect) => userFromSelect.targetSelect === targetSelect,
      );

      setIdx(userFromSelectIdx);
      prevUID ? setPrevUID(usersFromSelect[idx]?.user?.id) : null;
    }
  }, [usersFromSelect.length, isReFetchIdx]);

  return (
    <div>
      <div className={`grid grid-cols-4 gap-5`}>
        <select
          className={`select select-sm select-bordered focus:outline-none`}
          onChange={(e) => {
            handleUsersFromSelect(targetSelect, +e.target.value);
            handleUsersFromSelectDisabled(+e.target.value);
          }}
        >
          <option
            defaultValue=""
            selected={!Boolean(usersFromSelect[idx]?.user?.id)}
            disabled
          >
            Select user id
          </option>
          {users.map((user) => (
            <option
              key={user.id}
              defaultValue={user.id}
              selected={usersFromSelect[idx]?.user?.id === user.id}
              disabled={usersFromSelectDisabled.includes(user.id)}
            >
              {user.id}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Name"
          className={`input input-sm input-bordered focus:outline-none`}
          defaultValue={usersFromSelect[idx]?.user?.name}
          readOnly
          disabled
        />
        <input
          type="text"
          placeholder="Town"
          className={`input input-sm input-bordered focus:outline-none`}
          defaultValue={usersFromSelect[idx]?.user?.town}
          readOnly
          disabled
        />
        <input
          type="text"
          placeholder="City"
          className={`input input-sm input-bordered focus:outline-none`}
          defaultValue={usersFromSelect[idx]?.user?.city}
          readOnly
          disabled
        />
      </div>
      {targetSelect ? (
        <div className={`text-end mt-5`}>
          <button
            type="button"
            className={`btn btn-xs normal-case`}
            onClick={() => handleDeleteUsersFromSelect(targetSelect, prevUID)}
          >
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default UserSelect;
