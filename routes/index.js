const express = require("express");
const router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

// index route
router.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

// new message form (GET)
router.get("/new", (req, res) => {
  res.render("form", { title: "New Message" });
});

// new message form (POST)
router.post("/new", (req, res) => {
  const { messageUser, messageText } = req.body;
  messages.push({ text: messageText, user: messageUser, added: new Date() });
  res.redirect("/");
});

// message detail
router.get("/message/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const message = messages[id];

  if (!message) {
    return res.status(404).send("Message not found");
  }

  res.render("message", { title: "Message Detail", message });
});

module.exports = router;
