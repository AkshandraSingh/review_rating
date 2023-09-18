const companySchema = require('../models/companySchema'); // Import Company Schema.
const { unlinkSync } = require('fs'); // For Deleting Company Profile Pic.
const companyReviewSchema = require('../models/companyReviewSchema');  // Import Company Review Schema.

module.exports = {
    // Create Company API
    createCompany: async (req, res) => {
        const companyData = new companySchema(req.body); // Get data from the request body (e.g., from Postman).

        try {
            const companyExist = await companySchema.findOne({
                companyName: req.body.companyName,
            });

            companyData.companyName = req.body.companyName.trim().split(" ").map((data) => {
                return data.charAt(0).toUpperCase() + data.slice(1);
            }).join(" "); // Capitalize the first letter and trim.

            if (companyExist) {
                req.file ? unlinkSync(req.file.path) : null; // Delete unnecessary profile pic already stored.
                res.status(401).send({
                    success: false,
                    message: 'Company already exists',
                });
            }
            else {
                const filePath = `/uploads/${req.file.filename}`; // Path of Profile Pic.
                companyData.profilePic = filePath;
                const company = await companyData.save(); // Save data in the database.

                res.status(200).json({
                    success: true,
                    message: 'Company created',
                    companyDetails: company, // Company details.
                });
            }
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },

    // Company List API
    companyList: async (req, res) => {
        try {
            const companyOfList = await companySchema.find(
                {},
                { companyName: 1, _id: 0 }
            ); // Get data from the database.

            const count = await companySchema.find().count(); // Count the companies based on the database.

            res.status(200).json({
                success: true,
                message: 'List Of Company',
                count: count, // Count of companies.
                list: companyOfList, // List of companies.
            });
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },

    // Company Details API
    companyDetails: async (req, res) => {
        const id = req.params.id; // Get data from URL.

        try {
            const companyData = await companySchema.findById(id); // Find the company.
            const reviewData = await companyReviewSchema
                .find({ companyId: id })
                .populate({ path: "userId", select: "userName profilePic" });

            res.status(200).send({
                success: true,
                message: 'Company details',
                company: companyData, // Company details.
                review: reviewData, // Review details and user info.
            });
        } catch (err) {
            res.status(200).send({
                success: false,
                message: 'Company Details Not Found', // If company details not found in the database or there is a mistake in the URL.
                error: err.message,
            });
        }
    },

    // Sort Company API
    sortCompany: async (req, res) => {
        try {
            let sortedCompany = await companySchema.find().sort({ companyName: 1 }); // Sort companies and retrieve them from the database.

            res.status(200).send({
                success: true,
                message: "Company List With Sorted Format",
                data: sortedCompany, // Sorted company data.
            });
        }
        catch (err) {
            res.status(500).send({
                success: false,
                message: "There was an Error",
                error: err.message,
            });
        }
    },

    // Search Company API
    searchCompany: async (req, res) => {
        const { letter } = req.params; // Get data from URL.

        try {
            const searchData = await companySchema.find({ companyName: { $regex: `^${letter}`, $options: "i" } });

            if (searchData.length > 0) {
                res.status(200).send({
                    success: true,
                    message: "Company Found",
                    data: searchData, // Found company details.
                });
            } else {
                res.status(403).json({
                    success: false,
                    message: "Company Not Found", // If company not found.
                });
            }
        }
        catch (err) {
            res.status(500).send({
                success: false,
                message: "There was an Error",
                error: err.message,
            });
        }
    }
};
