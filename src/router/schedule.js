const express = require("express");
const {
	addSchedule,
	deleteSchedule,
	getSchedule,
	updateSchedule,
	getSchedules,
} = require("../controllers/scheduleController");

const router = express.Router();

router.post("/", addSchedule);
router.post("/read", getSchedules);
router.get("/:id", getSchedule);
router.put("/:id", updateSchedule);
router.delete("/:id", deleteSchedule);

module.exports = router;
