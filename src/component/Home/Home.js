import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [filterUser, setFilterUser] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
        if (filterUser.length === 0) {
          setFilterUser(res.data);
        }
      })
      .catch((error) => {
        console.log(error.massege);
      });
  }, []);

  const onchangeHandler = (data) => {
    const keys = ["name", "email"];
    const result = users.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(data))
    );
    setFilterUser(result);
  };
  return (
    <div className="container mt-4">
      <div className=" w-full bg-white">
        <div className="col-span-12">
          <div className="overflow-auto lg:overflow-visible ">
            {/* search bar */}

            <div className="search-bar border-b-2 border-fuchsia-900 pb-1">
              <form className="flex justify-end">
                <label className="relative block">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <input
                    className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    placeholder="Search by Name or Email"
                    type="text"
                    name="search"
                    onChange={(e) =>
                      onchangeHandler(e.target.value.toLocaleLowerCase())
                    }
                  />
                </label>
              </form>
            </div>

            {/* users table */}

            <table className="table text-gray-400 border-separate space-y-6 text-sm w-full">
              <thead className="bg-blue-500 text-white  text-lg">
                <tr className="p-3 text-center">
                  <th className="p-3 ">Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company Name</th>
                  <th>Zipcode</th>
                </tr>
              </thead>
              <tbody className="text-center text-base">
                {filterUser.length !== 0 ? (
                  <>
                    {filterUser.map((user, index) => (
                      <tr className="bg-blue-200 lg:text-black" key={index}>
                        <td className="p-3 font-medium capitalize">
                          {user.id}
                        </td>
                        <td className="p-3">{user.name}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">{user.company.name}</td>
                        <td className="p-3">{user.address.zipcode}</td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <div>
                    <h1 className="text-5xl text-center font-bold text-red-700">
                      Data Not Found
                    </h1>
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
