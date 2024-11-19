let database = require("../database");
// chagen cindy to req.user
// set users to have a reminders []
let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    database.cindy.reminders[req.params.id-1].title = req.body.title;
    database.cindy.reminders[req.params.id-1].description = req.body.description;
    database.cindy.reminders[req.params.id-1].completed = req.body.completed == "true";
    console.log(req.body.completed);
    console.log(database.cindy);
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    for (let i = 0; i < database.cindy.reminders.length; i++) {
      if (req.params.id == database.cindy.reminders[i].id) {
        const half1 = database.cindy.reminders.slice(0, i);
        const half2 = database.cindy.reminders.slice(i+1);
        database.cindy.reminders = half1.concat(half2);
      }
    }
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
