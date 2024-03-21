const express = require("express");
const router = express.Router();
const authorizationModel = require('../models/authorizationModel')
const authModel = require('../models/authorizationModel')

//ROUTE
//Assigns the authorization of a user
router.post('/assignAuth', async (req, res) => {
  try {
    const { userID, authorizationRole } = req.body;

    // Check if the authorization already exists for the given userID
    const existingAuth = await authorizationModel.findOne({ userID: userID });
    if (existingAuth) {
      return res.status(409).send({ message: "Authorization already exists for the given userID." });
    }

    // Create and save the authorization for the user
    const createAuth = new authorizationModel({
      userID: userID,
      authorizationRole: authorizationRole
    });

    const saveAuth = await createAuth.save();
    res.status(201).send(saveAuth);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//ROUTE
//gets a user's authorization
router.get("/getAuthById", async (req, res) => {
  try {
    const { userID } = req.body;

    // Check if userId is provided
    if (!userID) {
      return res.status(400).json({ error: "userId is required." });
    }

    // Find the user by userId
    const user = await authModel.findById(userID);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Find the authorization information for the user
    const auth = await authorizationModel.findOne({ userID: userID }); // Change to 'userID' if that's the field name

    // Check if authorization information exists
    if (!auth) {
      return res.status(404).json({ error: "Authorization not found for the user." });
    }

    // Return the user and authorization information
    return res.json({ user, auth });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//ROUTE
//retrieves all the users and authorizations
router.get('/getAllAuth', async (req, res) => {
  try {
    // Use aggregate to group by userID and get the latest authorization entry
    const auth = await authorizationModel.aggregate([
      {
        $group: {
          _id: '$userID',
          latestAuth: { $last: '$$ROOT' } // Get the latest authorization entry for each user
        }
      },
      {
        $replaceRoot: { newRoot: '$latestAuth' } // Replace the root document with the latestAuth
      }
    ]);

    return res.json(auth);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//ROUTE
//retrieves all users under a certain authorization(User or Admin)
router.get("/allUnderAuth", async (req, res) => {
  try {
    const { authorizationRole } = req.body;

    // Check if authorizationRole is provided and valid
    if (!authorizationRole || (authorizationRole !== "Admin" && authorizationRole !== "User")) {
      return res.status(400).json({ error: "Invalid authorization role." });
    }

    // Find the user by authorizationRole
    const user = await authModel.find({ authorizationRole: authorizationRole });

    // Check if users exist
    if (!user || user.length === 0) {
      return res.status(404).json({ error: `No users found with the role ${authorizationRole}.` });
    }

    // Return the user(s)
    return res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//ROUTE
//Deletes a user's authorization so that another can be assigned to them
router.post('/deleteAuth', async (req, res) => {

  // extract user information
  const { userID } = req.body;

  // Check if userId is provided
  if (!userID) {
    return res.status(400).json({ error: "userId is required." });
  }

  // Find the user by userId
  const user = await authModel.findById(userID);

  // Check if the user exists
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  // remove the authorization role
  user.authorizationRole = undefined;

  try {
      // save the updated user information
      await user.save();

  } 
  catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal server error" });
  }
});


  module.exports = router;