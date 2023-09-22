import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserSelect from "./UserSelect.jsx";

const Form = () => {
  const { register, handleSubmit } = useForm();
  const [isReFetchIdx, setReFetchIdx] = useState(false);
  const [userSelectCount, setUserSelectCount] = useState(1);
  const [usersFromSelect, setUsersFromSelect] = useState([]);
  const [usersFromSelectDisabled, setUsersFromSelectDisabled] = useState([]);
  const [users, setUsers] = useState([]);

  const onSubmit = (values) => {
    values.userIds = usersFromSelect.map((userFromSelect) => {
      return { userId: userFromSelect.user.id };
    });

    console.log(values);
  };

  const handleUsersFromSelect = (targetSelect, userId) => {
    const userFromSelectIdx = usersFromSelect.findIndex(
      (userFromSelect) => userFromSelect.targetSelect === targetSelect,
    );

    const user = users.find((user) => user.id === userId);

    if (userFromSelectIdx !== -1) {
      const arr = usersFromSelect;

      arr.splice(userFromSelectIdx, 1, { targetSelect, user });
      setUsersFromSelect([...arr]);
    } else {
      setUsersFromSelect([...usersFromSelect, { targetSelect, user }]);
    }

    setReFetchIdx(!isReFetchIdx);
  };

  useEffect(() => {
    fetch(`/users.json`)
      .then((response) => response.json())
      .then((result) => setUsers(result));
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
              isReFetchIdx={isReFetchIdx}
              usersFromSelect={usersFromSelect}
              usersFromSelectDisabled={usersFromSelectDisabled}
              setUsersFromSelectDisabled={setUsersFromSelectDisabled}
              users={users}
            />
          ))}
          <div className={`text-center mt-5`}>
            <button
              type="button"
              className={`btn btn-sm normal-case`}
              onClick={() => setUserSelectCount((prev) => ++prev)}
            >
              Add More
            </button>
          </div>
          <button type="submit" className={`btn btn-sm`}>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Form;
