import { Readable } from 'stream';
import { v2 as cloudinary } from 'cloudinary';
import { MedicalReport } from '../models/index.js';

const createReport = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ status: 'error', message: 'No file uploaded' });
    }

    const { _id } = req.user;
    const { reportName } = req.body;

    const bufferStream = new Readable();
    bufferStream.push(req.file.buffer);
    bufferStream.push(null);

    const myCloud = cloudinary.uploader.upload_stream(
      {
        folder: 'MedicalReport',
        use_filename: true,
        resource_type: 'auto',
        flags: 'attachment', // 👈 This makes the uploaded file downloadable by default
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({
            status: 'error',
            message: 'Failed to upload image',
            error: error.message,
          });
        }

        const report = await MedicalReport.create({
          reportName,
          report: {
            public_id: result.public_id,
            url: `https://res.cloudinary.com/ddnmv6tkn/image/upload/fl_attachment/${result.public_id}`,
          },
          creatorId: _id,
        });

        return res.status(201).json({
          status: 'success',
          message: 'Report created successfully',
          report,
        });
      }
    );

    bufferStream.pipe(myCloud);
  } catch (error) {
    console.error('Error creating report:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create report',
      error: error.message,
    });
  }
};

// Get reports created by the logged-in user
const getMyReports = async (req, res) => {
  try {
    const { _id } = req.user;

    const myReports = await MedicalReport.find({ creatorId: _id }).sort({
      createdAt: -1,
    });

    if (!myReports.length) {
      return res
        .status(404)
        .json({ status: 'error', message: 'No reports found' });
    }

    return res.status(200).json({ status: 'success', reports: myReports });
  } catch (error) {
    console.error('Error fetching reports:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch reports',
      error: error.message,
    });
  }
};

// Get all medical reports (for admin)
const getAllReports = async (req, res) => {
  try {
    const reports = await MedicalReport.find()
      .populate('creatorId', 'name email')
      .sort({ createdAt: -1 });

    if (!reports.length) {
      return res
        .status(404)
        .json({ status: 'error', message: 'No reports available' });
    }

    return res.status(200).json({ status: 'success', reports });
  } catch (error) {
    console.error('Error fetching all reports:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch reports',
      error: error.message,
    });
  }
};

// Update report with doctor remarks and suggested products
const updateReportByDoctor = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { doctorRemarks, suggestedProducts } = req.body;
    const { _id: doctorId } = req.user;

    // Find the report
    const report = await MedicalReport.findById(reportId);

    if (!report) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Report not found' });
    }

    // Update the report with doctor's details
    report.doctorRemarks = doctorRemarks || report.doctorRemarks;
    report.suggestedProducts = suggestedProducts || report.suggestedProducts;
    report.doctorDetails = doctorId;

    await report.save();

    return res.status(200).json({
      status: 'success',
      message: 'Report updated successfully',
      report,
    });
  } catch (error) {
    console.error('Error updating report:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update report',
      error: error.message,
    });
  }
};

// Delete a medical report
const deleteReport = async (req, res) => {
  try {
    const { reportId } = req.params;

    // Find the report
    const report = await MedicalReport.findById(reportId);

    if (!report) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Report not found' });
    }

    // Delete the report from the database
    await MedicalReport.findByIdAndDelete(reportId);

    return res
      .status(200)
      .json({ status: 'success', message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Error deleting report:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete report',
      error: error.message,
    });
  }
};

export const medicalReportController = {
  createReport,
  getMyReports,
  getAllReports,
  updateReportByDoctor,
  deleteReport,
};
