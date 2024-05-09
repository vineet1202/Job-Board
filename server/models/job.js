const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: { type: String },
    desc: { type: String },
    location: { type: String },
    title: { type: String },
    type: { type: String },
    job_link: { type: String },
    location_type: { type: String },
    salary: { type: String },
    max_salary: { type: Number },
    min_salary: { type: Number },
    logo: { type: String },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("job", jobSchema);
module.exports = Job;
