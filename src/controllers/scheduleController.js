const ScheduleModel = require("../models/scheduleModel");
// const { REFRESH_TOKEN_EXPIRE_TIME } = require("../config");

//POST Add
async function addSchedule(req, res) {
	console.log("add");
	const { title } = req.body;
	console.log(req.body);
	try {
		if (!title) return res.status(400).send({ error: "Title is required" });
		const body = req.body;
		const Schedule = new ScheduleModel(body);

		Schedule.save()
			.then((data) => {
				res.status(201).send(data);
			})
			.catch((err) => res.status(500).send(err));
	} catch (error) {
		return res.status(500).send(error);
	}
}

//Get
async function getSchedule(req, res) {
	console.log("get");
	const { id } = req.params;
	if (!id) return res.send(400).send({ error: "Id is required" });

	const kind = await ScheduleModel.findById(id).populate("user", "_id username email").exec();

	if (!kind) return res.status(500).send({ error: "Schedule type not found" });

	res.send(kind);
}
//Get All
async function getSchedules(req, res) {
	console.log("all get");
	const data = req.body;
	const startDate = data.startDate + "T00:00:00Z";
	const endDate = data.endDate + "T23:59:59Z";
	const schedules = await ScheduleModel.find({
		startDate: { $lte: endDate },
		endDate: { $gte: startDate },
	})
		.populate("user", "_id username email")
		.exec();

	if (!schedules) return res.status(500).send({ error: "Schedule type not found" });
	res.send(schedules);
}

// UPDATE
async function updateSchedule(req, res) {
	console.log("update");
	const { id } = req.params;
	try {
		if (!id) throw new Error("kind not found");

		const body = req.body;

		// check if body is empty
		if (Object.keys(body).length === 0) throw new Error("Update body cannot be empty");

		const update = await ScheduleModel.findOneAndUpdate({ _id: id }, body, { new: true }).populate(
			"user",
			"_id username email"
		);

		if (!update) throw new Error("kind Update Failed");

		res.status(201).send(update);
	} catch (error) {
		return res.status(400).send({ error: error.message });
	}
}

//Delete
async function deleteSchedule(req, res) {
	console.log("delete");
	const { id } = req.params;

	if (!id) return res.send(400).send({ error: "Id is required" });

	const kind = await ScheduleModel.findByIdAndDelete(id);

	if (!kind) return res.status(500).send({ error: "Schedule type not remove" });

	res.send(kind);
}

module.exports = {
	addSchedule,
	getSchedule,
	getSchedules,
	updateSchedule,
	deleteSchedule,
};
