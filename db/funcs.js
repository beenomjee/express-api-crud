import fs from "fs";

const getUsers = () => JSON.parse(fs.readFileSync("./db/data.json", "utf8"));
const createUser = (name, fName, lName) => {
  let allUsers = getUsers();
  const user = {
    id: allUsers[allUsers.length - 1].id + 1,
    name,
    fName,
    lName,
  };
  allUsers.push(user);
  fs.writeFileSync("./db/data.json", JSON.stringify(allUsers));
  return user;
};

const getUser = (id) =>
  JSON.parse(fs.readFileSync("./db/data.json", "utf8")).find(
    (user) => user.id == id
  );

const deleteUser = (id) => {
  let allUsers = getUsers().filter((user) => user.id !== Number(id));
  fs.writeFileSync("./db/data.json", JSON.stringify(allUsers));
};

const updateUser = (id, name, lName, fName) => {
  let allUsers = getUsers().map((user) => {
    if (user.id === Number(id)) {
      user.name = name;
      user.lName = lName;
      user.fName = fName;
    }
    return user;
  });
  fs.writeFileSync("./db/data.json", JSON.stringify(allUsers));
  return { id, name, fName, lName };
};

export { getUser, getUsers, createUser, deleteUser, updateUser };
