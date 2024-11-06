require("dotenv").config();
const prompt = require("prompt-sync")();
const mongoose = require("mongoose");
const connectDB = require("./src/db/db");
const Customer = require("./src/models/Customer");

const putCustomer = async () => {
  try {
  } catch (error) {
    console.error(error.message);
  }
  const name = prompt("What is the customer name? ");
  const age = prompt("What is the customer age? ");
  const customer = await Customer.create({ name, age });
  console.log("Customer created: ", customer);
};

const getCustomers = async () => {
  try {
    const customers = await Customer.find();
    console.log("All customers list: ", customers);
  } catch (error) {
    console.error(error.message);
  }
};

const patchCustomer = async () => {
  try {
    await getCustomers();
    const id = prompt("What is the customer id? ");
    const name = prompt("What is the customer new name? ");
    const age = prompt("What is the customer new age? ");
    const customer = await Customer.findByIdAndUpdate(
      id,
      { name, age },
      { new: true }
    );
    console.log("Customer updated: ", customer);
  } catch (error) {
    console.error(error.message);
  }
};

const deleteCustomer = async () => {
  try {
    await getCustomers();
    const id = prompt("What is the customer id? ");
    const customer = await Customer.findByIdAndDelete(id);
    console.log("Customer deleted: ", customer);
  } catch (error) {
    console.error(error.message);
  }
};

const start = async () => {
  await connectDB();
  console.log("");
  console.log("-----------------------------------------------");
  console.log("-------------- Welcome to the CRM -------------");
  console.log("-----------------------------------------------");
  console.log("");
  while (true) {
    console.log("");
    console.log("------------------------------------");
    console.log("What would you like to do?");
    console.log("");
    console.log("  1. Create a customer");
    console.log("  2. View all customers");
    console.log("  3. Update a customer");
    console.log("  4. Delete a customer");
    console.log("  5. quit");
    console.log("");
    const action = prompt("Number of action to run: ");
    if (action === "1") {
      await putCustomer();
    } else if (action === "2") {
      await getCustomers();
    } else if (action === "3") {
      await patchCustomer();
    } else if (action === "4") {
      await deleteCustomer();
    } else if (action === "5") {
      mongoose.connection.close();
      console.log("exiting...");
      process.exit();
    } else {
      console.log("Please choose a number between 1 to 5");
    }
    console.log("------------------------------------");
    console.log("");
  }
};

start();
