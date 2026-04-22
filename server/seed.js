require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./models/User");
const Ticket = require("./models/Ticket");

const seedDatabase = async () => {
  try {
    // 1. Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" Connected successfully.");

    await User.deleteMany({});
    await Ticket.deleteMany({});
    console.log(" Cleared existing database records.");

    const salt = await bcrypt.genSalt(10);
    const defaultPassword = await bcrypt.hash("password123", salt);

    const usersData = [
      // Admin
      {
        name: "Alice Admin",
        email: "admin@thecube.com",
        password: defaultPassword,
        role: "admin",
      },
      // Staff
      {
        name: "Bob Staff",
        email: "bob@thecube.com",
        password: defaultPassword,
        role: "staff",
      },
      {
        name: "Charlie Staff",
        email: "charlie@thecube.com",
        password: defaultPassword,
        role: "staff",
      },
      // Students
      {
        name: "David Student",
        email: "david@student.com",
        password: defaultPassword,
        role: "student",
        roomNumber: "101",
        accommodation: "Oak Hall",
        phone: "+1 555-0101",
      },
      {
        name: "Emma Student",
        email: "emma@student.com",
        password: defaultPassword,
        role: "student",
        roomNumber: "205",
        accommodation: "Maple Hall",
        phone: "+1 555-0102",
      },
      {
        name: "Frank Student",
        email: "frank@student.com",
        password: defaultPassword,
        role: "student",
        roomNumber: "312",
        accommodation: "Pine Hall",
        phone: "+1 555-0103",
      },
    ];

    const createdUsers = await User.insertMany(usersData);
    console.log(` Created ${createdUsers.length} users.`);

    // Extract student IDs to assign them as ticket creators
    const students = createdUsers.filter((user) => user.role === "student");

    // 3. Generate 10 Dummy Tickets
    const statuses = ["open", "in-progress", "resolved"];
    const priorities = ["low", "medium", "high", "urgent"];
    const categories = ["Plumbing", "Electrical", "Furniture", "Internet", "Other"];
    const issues = [
      "Leaky faucet",
      "Broken heater",
      "Wi-Fi not working",
      "Door lock jammed",
      "Lightbulb burnt out",
    ];

    const ticketsData = [];

    for (let i = 0; i < 10; i++) {
      // Randomize data
      const randomStudent =
        students[Math.floor(Math.random() * students.length)];
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];
      const randomPriority =
        priorities[Math.floor(Math.random() * priorities.length)];
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      const randomIssue = issues[Math.floor(Math.random() * issues.length)];

      ticketsData.push({
        title: `${randomIssue} in Room ${randomStudent.roomNumber}`,
        description: `This is a dummy description for a ${randomIssue}. Please fix it soon.`,
        status: randomStatus,
        priority: randomPriority,
        category: randomCategory,
        roomNumber: randomStudent.roomNumber,
        createdBy: randomStudent._id, // Linking ticket to a student
      });
    }

    const createdTickets = await Ticket.insertMany(ticketsData);
    console.log(`✅ Created ${createdTickets.length} tickets.`);

    console.log("🎉 Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

// Execute the function
seedDatabase();
