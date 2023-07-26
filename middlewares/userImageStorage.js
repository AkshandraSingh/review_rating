const multer = require('multer'); // ? It is Use to Give Data in Image Form
const path = require('path'); // ? It is a Build in Module . It use to Works with Files

const imageConfig = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, path.join(__dirname, "..", "/uploads")); // ! It Give Directory For Where Image is Store (Profile Pic) .
    },
    filename: (req, file, callback) => {
        var ext = file.originalname.substring(file.originalname.indexOf("."));
        callback(null, `image_${Date.now()}.${file.originalname}`) // !  It Give Unique Name to Each Image (Profile Pic) .
    }
})

const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true)
    } else {
        callback(new Error("Only Image files are Supported")) // ? It Show When User Not Give Image
    }
}

const upload = multer({
    storage: imageConfig,
    fileFilter: isImage,
})

module.exports = {
    upload
}
