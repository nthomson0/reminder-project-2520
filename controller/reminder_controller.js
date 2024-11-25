let database = require("../database");
// change cindy to req.user
// set users to have a reminders []

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: req.user.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: req.user.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    req.user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    req.user.reminders[req.params.id-1].title = req.body.title;
    req.user.reminders[req.params.id-1].description = req.body.description;
    req.user.reminders[req.params.id-1].completed = req.body.completed == "true";
    console.log(req.body.completed);
    console.log(req.user);
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    for (let i = 0; i < req.user.reminders.length; i++) {
      if (req.params.id == req.user.reminders[i].id) {
        const half1 = req.user.reminders.slice(0, i);
        const half2 = req.user.reminders.slice(i+1);
        req.user.reminders = half1.concat(half2);
      }
    }
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
