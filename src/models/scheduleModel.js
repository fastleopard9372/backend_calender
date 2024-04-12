const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const scheduleSchema = new mongoose.Schema(
	{
		id: Schema.Types.ObjectId,
		title: { type: String, required: true },
		demo: { type: String, required: true },
		kind: { type: Schema.Types.ObjectId, ref: "ScheduleKind" },
		color: { type: String, required: true },
		width: { type: Number, required: true },
		startDate: { type: Date, required: true },
		endDate: { type: Date, required: true },
		user: { type: Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
	// { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const ScheduleModel = mongoose.model("schedule", scheduleSchema);

module.exports = ScheduleModel;
