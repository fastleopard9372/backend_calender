const mongoose = require("mongoose");
const app = require("./app");
const dbConnect = require("./db/conn");

const PORT = process.env.PORT || "3000";
// Start Server if datbase connected
async function initializeApp() {
	try {
		await dbConnect();
		app.listen(PORT, () => {
			console.log("Server listening on PORT", PORT);
		});
	} catch (err) {
		console.log(err);
	}
}

// start mongodb and express
initializeApp();

// Handle MongoDB connection close on application termination
process.on("SIGINT", async () => {
	console.log("Received SIGINT. Closing MongoDB connection...");

	try {
		await mongoose.connection.close();
		console.log("MongoDB connection closed due to application termination");
		process.exit(0);
	} catch (error) {
		console.error("Error closing MongoDB connection:", error);
		process.exit(1);
	}
});
