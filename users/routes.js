import * as dao from "./dao.js";
// let currentUser = null;
function UserRoutes(app) {
  const findAllUsers = async (req, res) => {
    console.log("findAllUsers");
    const users = await dao.findAllUsers();
    res.send(users);
  };
  const findUserById = async (req, res) => {
    const { id } = req.params;
    const user = await dao.findUserById(id);
    res.send(user);
  };
  const findUserByUsername = async (req, res) => {
    const { username } = req.params;
    const user = await dao.findUserByUsername(username);
    res.send(user);
  };
  const findUserByCredentials = async (req, res) => {
    const { username, password } = req.params;
    const user = await dao.findUserByCredentials(username, password);
    res.send(user);
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };


  const createUser = async (req, res) => {
    const { username, password, firstName, lastName } = req.params;
    console.log("create user");
    console.log(req.params);
    let user = null;
    try {
      user = await dao.createUser({
        username,
        password,
        firstName,
        lastName,
      });
    } catch (e) {
      console.log(e);
    }
    res.send(user);
  };



  const updateUser = async (req, res) => {
    // const { id } = req.params;
    // const user = req.body;
    // const status = await dao.updateUser(id, user);
    // const currentUser = await dao.findUserById(id);
    // req.session["currentUser"] = currentUser;
    // res.send(status);
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    req.session['currentUser'] = currentUser;
    res.json(status);

  };

  const signIn = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    req.session['currentUser'] = currentUser;
    res.json(currentUser);

  };
  const signOut = async (req, res) => {
    // currentUser = null;
    // req.session.destroy();
    // res.sendStatus(200);
    req.session.destroy();
    res.json(200);
  };
  const signUp = async (req, res) => {
    // const { username, password } = req.body;
    // const userExists = await dao.findUserByUsername(username);
    // if (userExists) {
    //   res.sendStatus(403);
    //   return;
    // }
    // const user = await dao.createUser({ username, password });
    // const currentUser = user;
    // req.session["currentUser"] = currentUser;
    // res.json(user);
    const user = await dao.findUserByUsername(
      req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken" });
    }
    const currentUser = await dao.createUser(req.body);
    req.session['currentUser'] = currentUser;
    res.json(currentUser);

  };

  const account = async (req, res) => {
    res.json(req.session['currentUser']);
    // const currentUser = req.session["currentUser"];
    // if (currentUser) {
    // res.json(currentUser);
    // } else {
    //   res.sendStatus(403);
    // }
  };

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signUp);
  app.post("/api/users/signin", signIn);
  app.post("/api/users/signout", signOut);
  app.post("/api/users/account", account);
}
export default UserRoutes;