import mongoose from 'mongoose';

const medicalReportSchema = mongoose.Schema(
  {
    reportName: {
      type: String,
      required: [true, 'Please enter a report name'],
    },
    report: {
      public_id: { type: String },
      url: { type: String },
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctorRemarks: { type: String },
    suggestedProducts: { type: Array },
    doctorDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const MedicalReport = mongoose.model('MedicalReport', medicalReportSchema);
export default MedicalReport;
