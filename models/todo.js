const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      minLength: [3, "title is less than 3 characters"],
      maxLength: 25,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["to do", "doing", "done"],
      default: "to do",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const todosModel = mongoose.model("Todo", todoSchema);

module.exports = todosModel;
