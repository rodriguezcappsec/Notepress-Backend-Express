const express = require("express");
const handle = require("../../lib/error_handler");
const passport = require("passport");
const requireToken = passport.authenticate("bearer", { session: true });
const customErrors = require("../../lib/custom_errors");
const handle404 = customErrors.handle404;
const requireOwnership = customErrors.requireOwnership;
const Notes = require("../models/notes.js");
const router = express.Router();

router.get("/notes", requireToken, (req, res) => {
  Notes.find()
    .then(notes => {
      res.status(200).json({ notes: notes });
    })
    .catch(error => console.log(error));
});
router.post("/notes", requireToken, (req, res) => {
    
});

module.exports = router;
