const express = require("express");
const handle = require("../../lib/error_handler");
const passport = require("passport");
const requireToken = passport.authenticate("bearer", { session: true });
const customErrors = require("../../lib/custom_errors");
// const handle404 = customErrors.handle404;
// const requireOwnership = customErrors.requireOwnership;
const Notes = require("../models/notes.js");
const router = express.Router();

router.get("/notes", requireToken, (req, res) => {
  Notes.find()
    .then(notes => res.status(200).json({ notes: notes }))
    .catch(error => console.log(error));
});
router.get("/notes/:id", requireToken, (req, res) => {
  Notes.findById(req.params.id)
    .then(note => res.status(200).json({ note: note }))
    .catch(error => console.log(error));
});
router.post("/notes", requireToken, (req, res) => {
  req.body.note.userID = req.user.id;
  Notes.create(req.body.note)
    .then(createdNote => res.status(201).json({ note: createdNote }))
    .catch(error => console.log(error));
});
router.patch("/notes/:id", requireToken, (req, res) => {
  Notes.findByIdAndUpdate(
    req.params.id,
    req.body.note,
    { new: true },
    (err, good) => {
      if (err) {
        res.status(500).send("Error trying to patch");
        return;
      }
      res.status(200).json(good);
    }
  );
});
router.delete("/notes/:id", requireToken, (req, res) => {
  Notes.findByIdAndRemove(req.params.id, (err, todo) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send("Note successfully deleted!!");
  });
});

module.exports = router;
