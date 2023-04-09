import React from "react";
import UserModal from "../../components/modals/user modal/UserModal";

const Users = () => {
  const [users, setUsers] = React.useState([]);
  const [errors, setErrors] = React.useState(null);
  const allUsers = React.useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();
      if (!response.ok) {
        setErrors(json.error);
        return;
      }

      if (response.ok) {
        setUsers(json.users);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h1 className="text-light">User Manager</h1>

      {users?.length > 0 && (
        <>
          <table class="table table-dark table-bordered ">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">IMG</th>
                <th scope="col">NAME</th>
                <th scope="col">Email</th>
                <th scope="col">EDIT</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <th scope="row">{user._id}</th>
                  <th>
                    <img src={user.imageURL} width={"50px"} alt="" />
                  </th>
                  <th>{user.displayName}</th>
                  <th>{user.email}</th>
                  <th>
                    <UserModal user={user} />
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Users;
