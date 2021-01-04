const express = require('express');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs').promises;
const router = express.Router();
// see: https://stackabuse.com/reading-and-writing-json-files-with-node-js/

// GET all users
router.get('/', (req, res) => {
  // send the json db file in response
  res.sendFile(path.join(__dirname, '../userDb.json'));
});

// GET one user
router.get('/:id', async (req, res) => {
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
});

// POST add a user
router.post('/', async (req, res) => {
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
});

router.delete('/:id', async (req, res) => {
  // extract id
  const { id } = req.params;
  // pull users from json file
  let users = JSON.parse(
    await fs.readFile(path.join(__dirname, '../userDb.json'), 'utf-8')
  );
  if (users.find((user) => user.id === id)) {
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
});

module.exports = router;
