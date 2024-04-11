const express = require("express");
const {
	addScheduleKind,
	deleteScheduleKind,
	getScheduleKind,
	updateScheduleKind,
	getScheduleKinds,
} = require("../controllers/scheduleKindController");

const router = express.Router();

router.post("/", addScheduleKind);
router.get("/:id", getScheduleKind);
router.put("/:id", updateScheduleKind);
router.delete("/:id", deleteScheduleKind);
router.get("/", getScheduleKinds);

module.exports = router;
