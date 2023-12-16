import React, { useEffect, useState } from "react";
import UserSelect from "./UserSelect.jsx";

const Form = () => {
  const [users, setUsers] = useState([]);
  const [userList, setUserList] = useState([{ user: {} }]);
  const [revUsers, setRevUsers] = useState([]);
  const [save, setSave] = useState(false);

  const handleAddMore = () => {
    setUserList([...userList, { user: {} }]);
  };

  const handleRemove = (idx) => {
    const arr = [...userList];

    arr.splice(idx, 1);
    setUserList(arr);
  };

  const handleChange = (e, idx) => {
    const { name, value } = e.target;
    const arr = [...userList];

    arr[idx][name] = value;
    setUserList(arr);
  };

  useEffect(() => {
    if (save) {
      const arr = [
        ...userList
          .map((elem) => ({
            ...(elem.user
              ? typeof elem.user === "string"
                ? JSON.parse(elem.user)
                : elem.user
              : {}),
          }))
          .filter((elem) => Boolean(elem.id)),
      ];

      setRevUsers(arr);
      setSave(false);
    }
  }, [save]);

  useEffect(() => {
    fetch(`./users.json`)
      .then((response) => response.json())
      .then((result) => setUsers(result));
  }, []);

  return (
    <>
      <section className={`py-10`}>
        <div className="container">
          <form className={`grid grid-cols-1 gap-5`}>
            <input
              type="text"
              placeholder="Branch"
              className={`input input-sm input-bordered focus:outline-none`}
              required
            />
            <input
              type="text"
              placeholder="Location"
              className={`input input-sm input-bordered focus:outline-none`}
              required
            />
            <UserSelect
              setSave={setSave}
              handleAddMore={handleAddMore}
              handleRemove={handleRemove}
              handleChange={handleChange}
              userList={userList}
              users={users}
            />
          </form>
        </div>
      </section>
      {revUsers.length ? (
        <section className={`mt-10`}>
          <div className="container">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Town</th>
                    <th>City</th>
                  </tr>
                </thead>
                <tbody>
                  {revUsers.map((elem, idx) => {
                    return (
                      <tr key={elem.id}>
                        <th>{++idx}</th>
                        <td>{elem.name}</td>
                        <td>{elem.town}</td>
                        <td>{elem.city}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default Form;
