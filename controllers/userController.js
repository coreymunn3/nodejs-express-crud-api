// see: https://stackabuse.com/reading-and-writing-json-files-with-node-js/
const uuid = require('uuid');
const path = require('path');
const fs = require('fs').promises;

// METHODS

const getAllUsers = (req, res) => {
  // send the json db file in response
  res.sendFile(path.join(__dirname, '../userDb.json'));
};

const getOneUser = async (req, res) => {
  // extract id
  const { id } = req.params;
  // pull users from json file
  const users = JSON.parse(
    await fs.readFile(path.join(__dirname, '../userDb.json'), 'utf-8')
  );
  // find user in list of users
  try {
    const user = users.find((user) => user.id === id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: 'User Not Found' });
  }
};

const createUser = async (req, res) => {
  const userWithId = { ...req.body, id: uuid.v4() };
  // pull users from json file
  const users = JSON.parse(
    await fs.readFile(path.join(__dirname, '../userDb.json'), 'utf-8')
  );
  // add new user
  users.push(userWithId);
  // write new users list to json file
  await fs.writeFile(
    path.join(__dirname, '../userDb.json'),
    JSON.stringify(users)
  );
  // send response
  res.json(userWithId);
};

const updateUser = async (req, res) => {
  // extract id and body
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;
  // pull users from json file
  let users = JSON.parse(
    await fs.readFile(path.join(__dirname, '../userDb.json'), 'utf-8')
  );
  userToUpdate = users.find((user) => user.id === id);
  if (userToUpdate) {
    // update fields
    if (firstName) userToUpdate.firstName = firstName;
    if (lastName) userToUpdate.lastName = lastName;
    if (age) userToUpdate.age = age;
    // write new array
    await fs.writeFile(
      path.join(__dirname, '../userDb.json'),
      JSON.stringify(users)
    );
    res.status(200).json(userToUpdate);
  } else {
    res.status(404).json({ message: `User ${id} Not Found` });
  }
};

const deleteUser = async (req, res) => {
  // extract id
  const { id } = req.params;
  // pull users from json file
  let users = JSON.parse(
    await fs.readFile(path.join(__dirname, '../userDb.json'), 'utf-8')
  );
  // find and delete from array
  const userToDelete = users.find((user) => user.id === id);
  if (userToDelete) {
    // filter users and re-save to file
    users = users.filter((user) => user.id !== id);
    // write new users list to json file
    await fs.writeFile(
      path.join(__dirname, '../userDb.json'),
      JSON.stringify(users)
    );
    // respond
    res.status(200).json({ message: `User ${id} has been deleted` });
  } else {
    res.status(404).send({ message: `User ${id} Not Found` });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
