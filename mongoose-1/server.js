require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./User");

mongoose.connect(process.env.URI);

async function add() {
  const user = await User.create({ name: "forhadxx", age: 40 });
  await user.save();

  console.log(user);
}

add();

async function fetch() {
  // const users = await User.find(); // fetch all users

  // const user = await User.findById("62c161794a7e668f12084528"); // find single user

  // const users = await User.find({ age: { $gte: 30 } }); // fetch user which age 30 =<

  // const users = await User.find({ name: { $in: ["forhad", "fuzal"] } }); // fetch value which have those names

  // const users = await User.find({ age: 25, name: "forhad" });
  // const users = await User.find({ $and: [{ age: 25}, {name: "forhad" }] });
  const users = await User.find({
    $or: [{ age: 25 }, { name: { $in: ["forhad", "fuzal"] } }],
  });

  console.log("users: ", users);
}
// fetch();

/*  Read modifire
  sort -> User.find().sort({name: -1}) // -1 dsce order, 1 asc order
  limit -> User.find().limit(4) // show top 4 data
  skip -> User.find().skip(3) // avoid first 3 data
*/

/*  Filter

    Users.find({ age: { $lte: 15 } })
    
      $eq  : equal
      $ne  : not equal
      $gt  : greater then
      $gte : greater then or equal
      $lt : less then or equal
      $lte : less then or equal

    
    users.find({ name: { $in: [“Kyle”, “Mike”] } })
      $in  : check many values exits
      $nin : check some values not exits

    
    User.find({ $and: [{ age: 25}, {name: "forhad" }] });
      $and  : check multiple field by condition 
      $or   :


    User.find({ name: { $not: { $eq: "forhad" } } })
      $not : not value

    User.find({ $expr: { $gt: [“$balance”, “$debt”] } })
        $expr   : compare btn 2 field
*/
