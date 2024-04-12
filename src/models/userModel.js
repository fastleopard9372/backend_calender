const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		last_login: { type: Date },
		profile: {
			name: { type: String },
			dob: { type: Date },
			avatar: { type: String },
		},
		roles: { type: [String], default: ["user"] },
	},
	{ timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
