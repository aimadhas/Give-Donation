    const express = require("express");
    const { register, login, getAll, getById, update } = require("../controllers/users");
    const Auth = require("../middleware/auth");
    const router = express.Router();

    router.post("/register", register);
    router.post("/login", login);
    router.get("/users", getAll);
    router.get("/profile/:id", getById);
    router.put("/profile/:id", update);

    module.exports = router;