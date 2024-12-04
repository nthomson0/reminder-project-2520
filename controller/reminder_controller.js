// let database = require("../database");
const db = require("../db");


let remindersController = {
  list: async (req, res) => {
    const reminders = await db.reminder.findMany( { where: { userId: req.user.id }});
    console.log(reminders);
    res.render("reminder/index", { reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: async (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = await db.reminder.findUnique({ where: { id: parseInt(reminderToFind)}});

    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: req.user.reminders });
    }
  },

  create: async (req, res) => {
    const userId = 1
    // req.user.id
    // let reminder = {
    //   id: req.user.reminders.length + 1,
    //   title: req.body.title,
    //   description: req.body.description,
    //   completed: false,
    // };
    await db.reminder.create({
      data: {
      title: req.body.title,
      description: req.body.description,
      completed: false,
      user: { connect: { id: userId }},
    }
    })
      // req.user.reminders.push(reminder);
      res.redirect("/reminders");
    },
    
  edit: async (req, res) => { // tried to edit
    let reminderToFind = req.params.id;
    let searchResult = await db.reminder.findUnique({ where: { id: parseInt(reminderToFind)}});
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: async (req, res) => {
    // req.user.reminders[req.params.id-1].title = req.body.title;
    // req.user.reminders[req.params.id-1].description = req.body.description;
    // req.user.reminders[req.params.id-1].completed = req.body.completed == "true";
    await db.reminder.update({
      where: {
        id: parseInt(req.params.id)
      },
      data: {
       title: req.body.title,
       description: req.body.description, 
       completed: req.body.completed == "true"
      }
    })
    // db.reminder.update({})
    res.redirect("/reminders");
  },

  delete: async (req, res) => {
    let reminderToFind = req.params.id;
    await db.reminder.delete({ where: { id: parseInt(reminderToFind)}});  
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
