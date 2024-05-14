import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";

const users = [
  {
    id: 1,
    name: "Prasad",
  },
  {
    id: 2,
    name: "thimira",
  },
];

const Users = () => {
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
      <UserForm />
      <UsersTable rows={users} />{" "}
    </Box>
  );
};

export default Users;
