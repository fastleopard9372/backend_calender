const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const scheduleKindSchema = new mongoose.Schema(
	{
		id: Schema.Types.ObjectId,
		name: { type: String, required: true, unique: true },
		avatar: { type: String },
	},
	{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const ScheduleKindModel = mongoose.model("ScheduleKind", scheduleKindSchema);

module.exports = ScheduleKindModel;
