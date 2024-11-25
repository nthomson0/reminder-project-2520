const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    reminders: [{
      id: 1,
      title: "buy milk",
      description: "go to safeway and buy milk",
      completed: false,
    },]
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    reminders: [{
      id: 1,
      title: "buy soda",
      description: "go to safeway and buy mpizza",
      completed: true,
    },]
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    reminders: []
  },
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  adduser: (id, name) => {
    const user = database.find((user) => user.id === id);
    if (!user) {
      database.push({id:id, name:name, role:"user"})
    }
    else{
      console.log("user already exits in db")
    }


  }
};

module.exports = { database, userModel };
