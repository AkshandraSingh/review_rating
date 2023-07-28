const companySchema = require('../models/companySchema') // ? Company Schema .
const { unlinkSync } = require('fs'); // ? For Deleteing Company Profile Pic . 
const companyReviewSchema = require('../models/companyReviewSchema');  // ? Company Review Schema .

module.exports = {
    // * Create Company API ✌
    createCompany: async (req, res) => {
        const companyData = new companySchema(req.body) // ? Taking Data from Postman body
        try {
            const companyExist = await companySchema.findOne({ // ! Check the Compnay Name is allready Register or Not .
                companyName: req.body.companyName,
            });
            companyData.companyName = req.body.companyName.trim().split(" ").map((data) => {
                return data.charAt(0).toUpperCase() + data.slice(1);
            }).join(" ") // ! Converting First letter in Capital and Trim .
            if (companyExist) {
                req.file ? unlinkSync(req.file.path) : null; // ! Deleating Unnecessary Profile Pic That Allready Store in Folder .
                res.status(401).send({
                    success: false,
                    message: 'Company allready exists',
                });
            }
            else {
                const filePath = `/uploads/${req.file.filename}`; // ! Path of Profile Pic .
                companyData.profilePic = filePath;
                const company = await companyData.save() // ? Saveing Data in DataBase
                res.status(200).json({
                    success: true,
                    message: 'Company created',
                    companyDetails: company, // ? Data of Company Details
                });
            }
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },

    // * Company List API 😀
    companyList: async (req, res) => {
        try {
            const companyOfList = await companySchema.find(
                {},
                {companyName: 1 , _id: 0}
            ) // ! Takeing Data from Database .
            const count = await companySchema.find().count(); // ! Counting the Company (Count the Company base of DataBase) .
            res.status(200).json({
                success: true,
                message: 'List Of Company',
                count: count, // ? Count of Company .
                list: companyOfList, // ? List of Company .
            });

        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },

    // * Company Details API ✌
    companyDetails: async (req, res) => {
        const id = req.params.id // ! It means take Data from URL .
        try {
            const companyData = await companySchema.findById(id) // ? Finding the Company .
            const reviewData = await companyReviewSchema // ! Taking Data From Review Collection also .
                .find({ companyId: id })
                .populate({ path: "userId", select: "userName profilePic" })
            res.status(200).send({
                success: true,
                message: 'Company details',
                company: companyData, // ? Company Deatail .
                review: reviewData // ? Review Detail and User .
            })
        } catch (err) {
            res.status(200).send({
                success: false,
                message: 'Company Details Not Found', // ? If Company Details Not Found in DataBase or there is Mistake in URL .
                error: err.message
            })
        }
    },

    // * Sort Company API 😁
    sortCompany: async (req, res) => {
        try {
            let sortedCompany = await companySchema.find().sort({ companyName: 1 }) // ? For Sort Company and Find From DataBase .
            res.status(200).send({
                success: true,
                message: "Company List With Sorted Format 😎",
                data: sortedCompany // ! Sort Company Data .
            })
        }
        catch (err) {
            res.status(500).send({
                success: false,
                message: "There was an Error 😶",
                error: err.message
            })
        }
    },

    // * Search Company API 🤩
    searchCompany: async (req, res) => {
        const { letter } = req.params // ! Taking Data From URL .
        try {
            const searchData = await companySchema.find({ companyName: { $regex: `^${letter}`, $options: "i" } })
            if (searchData.length > 0) {
                res.status(200).send({
                    success: true,
                    message: "Company Found ✔",
                    data: searchData // ? Founded Company Detail .
                })
            } else {
                res.status(403).json({
                    success: false,
                    message: "Company Not Found 🙂" // ? If company Not Found .
                })
            }

        }
        catch (err) {
            res.status(500).send({
                success: false,
                message: "There was an Error 👀",
                error: err.message
            })
        }
    }
}
