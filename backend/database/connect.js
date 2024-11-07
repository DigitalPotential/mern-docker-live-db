// create a connection to our MongoDB database
const mongoose = require("mongoose");
const colors = require("colors");

function connect() {
  // Add options for better stability
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  };

  mongoose
    .connect(process.env.MONGODB_URL, options)
    .then(() => {
      console.log(colors.green.bold("Successfully connected to MongoDB Atlas"));
    })
    .catch((err) => {
      console.log(colors.red.bold("MongoDB connection failed. Exiting..."));
      console.error(colors.red(err));
      process.exit(1);
    });

  // Handle connection errors after initial connection
  mongoose.connection.on("error", (err) => {
    console.error(colors.red("MongoDB connection error:"), err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log(colors.yellow("MongoDB disconnected"));
  });
}

module.exports = connect;
