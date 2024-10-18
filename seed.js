const mongoose = require("mongoose");
const Account = require("./models/account");

mongoose.connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true });

const createAdminAccount = async () => {
  const existingAdmin = await Account.findOne({ username: "admin" });
  if (!existingAdmin) {
    const admin = new Account({
      username: "admin",
      password: "123456",
    });
    await admin.save();
    console.log("Admin account created");
  } else {
    console.log("Admin account already exists");
  }
  mongoose.disconnect();
};

createAdminAccount();
