import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserSelect from "./UserSelect.jsx";

const Form = () => {
  const { register, handleSubmit } = useForm();
  const [isReFetch, setReFetch] = useState(false);
  const [userSelectCount, setUserSelectCount] = useState(1);
  const [usersFromSelect, setUsersFromSelect] = useState([]);
  const [usersFromSelectDisabled, setUsersFromSelectDisabled] = useState([]);
  const [users, setUsers] = useState([]);

  const onSubmit = (values) => {
    values.userIds = usersFromSelect
      .map((userFromSelect) => {
        return { userId: userFromSelect.user?.id };
      })
      .filter((userFromSelect) => Boolean(userFromSelect.userId));

    console.log(values);
  };

  const handleAddMore = () => {
    setUserSelectCount((prev) => ++prev);

    setUsersFromSelect([
      ...usersFromSelect,
      {
        targetSelect:
          usersFromSelect[usersFromSelect.length - 1].targetSelect + 1,
        user: null,
      },
    ]);
  };

  const handleUsersFromSelect = (targetSelect, userId) => {
    const arr = [...usersFromSelect];

    const userFromSelectIdx = arr.findIndex(
      (userFromSelect) => userFromSelect.targetSelect === targetSelect,
    );

    const user = users.find((user) => user.id === userId);
    arr.splice(userFromSelectIdx, 1, { targetSelect, user });

    setUsersFromSelect(arr);
    setReFetch(!isReFetch);
  };

  const handleDeleteUsersFromSelect = (targetSelect) => {
    const arr = [...usersFromSelect];

    const userFromSelectIdx = arr.findIndex(
      (userFromSelect) => userFromSelect.targetSelect === targetSelect,
    );

    arr.splice(userFromSelectIdx, 1);

    for (let i = userFromSelectIdx; i < arr.length; i++) {
      arr[i].targetSelect -= 1;
    }

    setUserSelectCount((prev) => --prev);
    setUsersFromSelect(arr);
    setReFetch(!isReFetch);
  };

  useEffect(() => {
    fetch(`/users.json`)
      .then((response) => response.json())
      .then((result) => setUsers(result));
  }, []);

  useEffect(() => {
    const userFromSelect = {
      targetSelect: 0,
      user: null,
    };

    setUsersFromSelect([userFromSelect]);
  }, []);

  return (
    <section className={`py-10`}>
      <div className="container">
        <form
          className={`grid grid-cols-1 gap-5`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Branch"
            className={`input input-sm input-bordered focus:outline-none`}
            {...register("branch")}
            required
          />
          <input
            type="text"
            placeholder="Location"
            className={`input input-sm input-bordered focus:outline-none`}
            {...register("location")}
            required
          />
          {[...Array(userSelectCount)].map((_, idx) => (
            <UserSelect
              key={idx}
              targetSelect={idx}
              handleUsersFromSelect={handleUsersFromSelect}
              handleDeleteUsersFromSelect={handleDeleteUsersFromSelect}
              isReFetch={isReFetch}
              usersFromSelect={usersFromSelect}
              usersFromSelectDisabled={usersFromSelectDisabled}
              setUsersFromSelectDisabled={setUsersFromSelectDisabled}
              users={users}
            />
          ))}
          <div className={`flex justify-center gap-5 mt-5`}>
            <button
              type="button"
              className={`btn btn-sm normal-case`}
              onClick={handleAddMore}
            >
              Add More
            </button>
            <button type="submit" className={`btn btn-sm normal-case`}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
