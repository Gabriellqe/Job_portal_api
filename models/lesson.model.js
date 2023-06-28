const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    tittle: {
      type: String,
      required: true,
      trim: true,
      minlenght: 3,
      maxlenght: 350,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      minlenght: 10,
    },
    video: {
      type: String,
    },
    freePreview: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lesson", lessonSchema);
