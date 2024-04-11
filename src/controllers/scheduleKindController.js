const ScheduleKindModel = require("../models/scheduleKindModel");
// const { REFRESH_TOKEN_EXPIRE_TIME } = require("../config");

//POST Add
async function addScheduleKind(req, res) {
	console.log(req.body);
	console.log("add");
	const { name, avatar } = req.body;
	try {
		if (!name) return res.status(400).send({ error: "Schedule type is required" });
		// if (!avatar) return res.status(400).send({ error: "Avatar is required" });

		const nameExits = await ScheduleKindModel.exists({ name });
		if (nameExits) {
			let errors = [];
			if (nameExits) errors.push("Schedule name already in use");
			return res.status(400).send({ errors });
		}
		const scheduleKind = new ScheduleKindModel({
			name,
			avatar,
		});

		scheduleKind
			.save()
			.then((kind) => {
				res.status(201).send(kind);
			})
			.catch((err) => res.status(500).send(err));
	} catch (error) {
		return res.status(500).send(error);
	}
}

//Get Kind
async function getScheduleKind(req, res) {
	console.log("get");
	const { id } = req.params;

	if (!id) return res.send(400).send({ error: "Id is required" });

	const kind = await ScheduleKindModel.findById(id);

	if (!kind) return res.status(500).send({ error: "Schedule type not found" });

	res.send(kind);
}
//Get All Kind
async function getScheduleKinds(req, res) {
	console.log("all get");
	const kind = await ScheduleKindModel.find({});

	if (!kind) return res.status(500).send({ error: "Schedule type not found" });

	res.send(kind);
}

// UPDATE Kind
async function updateScheduleKind(req, res) {
	console.log("update");
	const { id } = req.params;
	try {
		if (!id) throw new Error("kind not found");

		const body = req.body;

		// check if body is empty
		if (Object.keys(body).length === 0) throw new Error("Update body cannot be empty");

		// update the kind
		const updateKind = await ScheduleKindModel.findOneAndUpdate({ _id: id }, body);

		if (!updateKind) throw new Error("kind Update Failed");

		res.status(201).send({ msg: "kind updated successfully" });
	} catch (error) {
		return res.status(400).send({ error: error.message });
	}
}

//Delete Kind
async function deleteScheduleKind(req, res) {
	console.log("delete");
	const { id } = req.params;

	if (!id) return res.send(400).send({ error: "Id is required" });

	const kind = await ScheduleKindModel.findByIdAndDelete(id);

	if (!kind) return res.status(500).send({ error: "Schedule type not remove" });

	res.send(kind);
}

module.exports = {
	addScheduleKind,
	getScheduleKind,
	getScheduleKinds,
	updateScheduleKind,
	deleteScheduleKind,
};
