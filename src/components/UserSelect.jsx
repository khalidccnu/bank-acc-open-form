import React, { useEffect, useState } from "react";

const UserSelect = ({
  targetSelect,
  handleUsersFromSelect,
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
      const arr = usersFromSelectDisabled;

      const userFromSelectDisabledIdx = arr.findIndex(
        (userFromSelectDisabled) => userFromSelectDisabled === prevUID,
      );

      arr.splice(userFromSelectDisabledIdx, 1, userId);
      setUsersFromSelectDisabled(arr);
    } else {
      setUsersFromSelectDisabled((prev) => [...prev, userId]);
    }

    setPrevUID(userId);
  };

  useEffect(() => {
    if (usersFromSelect.length) {
      const userFromSelectIdx = usersFromSelect.findIndex(
        (userFromSelect) => userFromSelect.targetSelect === targetSelect,
      );

      if (userFromSelectIdx !== -1) setIdx(userFromSelectIdx);
    }
  }, [isReFetchIdx]);

  return (
    <div className={`grid grid-cols-4 gap-5`}>
      <select
        className={`select select-sm select-bordered focus:outline-none`}
        onChange={(e) => {
          handleUsersFromSelect(targetSelect, +e.target.value);
          handleUsersFromSelectDisabled(+e.target.value);
        }}
      >
        <option defaultValue="" selected disabled>
          Select user id
        </option>
        {users.map((user) => (
          <option
            key={user.id}
            defaultValue={user.id}
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
        defaultValue={usersFromSelect[idx]?.user.name}
        readOnly
        disabled
      />
      <input
        type="text"
        placeholder="Town"
        className={`input input-sm input-bordered focus:outline-none`}
        defaultValue={usersFromSelect[idx]?.user.town}
        readOnly
        disabled
      />
      <input
        type="text"
        placeholder="City"
        className={`input input-sm input-bordered focus:outline-none`}
        defaultValue={usersFromSelect[idx]?.user.city}
        readOnly
        disabled
      />
    </div>
  );
};

export default UserSelect;
