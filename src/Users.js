import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import Axios from "axios";
import { useEffect, useState } from "react";

// const users = [
//   {
//     id: 1,
//     name: "Prasad",
//   },
//   {
//     id: 2,
//     name: "thimira",
//   },
// ];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedUser, setselectedUser] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    Axios.get("http://localhost:3001/api/users")
      .then((response) => {
        setUsers(response.data.response || []);
      })
      .catch((error) => {
        console.error("Axios Error :", error);
      });
  };

  const addUser = (data) => {
    setSubmitted(true);

    const payload = {
      id: data.id,
      name: data.name,
    };

    Axios.post("http://localhost:3001/api/createUser", payload)

      .then(() => {
        getUsers();
        setSubmitted(false);
      })
      .catch((error) => {
        console.error("Axios Error :", error);
      });
  };

  const updateUser = (data) => {
    setSubmitted(true);

    const payload = {
      id: data.id,
      name: data.name,
    };

    Axios.put("http://localhost:3001/api/updateUser", payload)

      .then(() => {
        getUsers();
        setSubmitted(false);
        isEdit(false);
      })
      .catch((error) => {
        console.error("Axios Error :", error);
      });
  };

  const deleteUser = (data) => {
    Axios.post("http://localhost:3001/api/deleteUser", data)

      .then(() => {
        getUsers();
      })
      .catch((error) => {
        console.error("Axios Error :", error);
      });
  };

  return (
    <Box
      alignItems="center"
      sx={{
        width: "calc(100% - 100px)",
        margin: "auto",
        marginTop: "100px",
        borderRadius: "10px",
        border: "5px solid grey",
      }}
    >
      <UserForm
        addUser={addUser}
        submitted={submitted}
        data={selectedUser}
        isEdit={isEdit}
        updateUser={updateUser}
      />{" "}
      <UsersTable
        rows={users}
        selectedUser={(data) => {
          setselectedUser(data);
          setIsEdit(true);
        }}
        deleteUser={(data) => {
          window.confirm("Are you sure");
          deleteUser(data);
        }}
      />{" "}
    </Box>
  );
};

export default Users;
