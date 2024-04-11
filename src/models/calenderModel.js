const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const calenderSchema = new mongoose.Schema(
	{
		id: Schema.Types.ObjectId,
		name: { type: String, required: true, unique: true },
		avatar: { type: String, required: true },
	},
	{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const CalenderModel = mongoose.model("Calender", calenderSchema);

module.exports = CalenderModel;
