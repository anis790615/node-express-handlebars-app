/* eslint-disable no-param-reassign */
/* eslint-disable radix */
const express = require("express");
const uuid = require("uuid");

const members = require("../../Members");

const router = express.Router();

//  Get All Members
router.get("/", (req, res) => res.json(members));

// Get a single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    // res.send(400, "No member with that id");
    res.status(400).json({ msg: `No member with id ${req.params.id}` });
  }
});

// Create member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };
  if (!newMember.name || !newMember.email) {
    return res
      .status(400)
      .json({ msg: "Member should contain name and email" });
  }
  members.push(newMember);
  // return res.json(members);
  res.redirect("/");
});

// Update member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const updatedMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updatedMember.name ? updatedMember : member.name;
        member.email = updatedMember.email ? updatedMember : member.email;
        res.json({ msg: "Member was updated", member });
      }
    });
  } else {
    // res.send(400, "No member with that id");
    res.status(400).json({ msg: `No member with id ${req.params.id}` });
  }
});
// Delete member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: "Member Deleted",
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    // res.send(400, "No member with that id");
    res.status(400).json({ msg: `No member with id ${req.params.id}` });
  }
});
module.exports = router;
