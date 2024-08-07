const express = require("express");

const { LibraryController } = require("../../controllers");
const Library = express.Router();
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dzwvmqbv0",
  api_key: 572782272174972,
  api_secret: "Sx6t5hAG6ynwO6mr8GN-L55A7MI",
});

// Configure Multer storage using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "library-images",
    resource_type: "auto",
  },
});
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './uploads/');
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });
const upload = multer({ dest: 'uploads/' }); // Temporary storage for uploaded files

Library.get("/ping", LibraryController.pingAdmin);
Library.post(
  "/createLibrary",
  upload.fields([
    { name: "card", maxCount: 1 },
    { name: "images", maxCount: 10 },
    { name: "gst", maxCount: 1 },
    { name: "cin", maxCount: 1 },
    { name: "tan", maxCount: 1 },
    { name: "msme", maxCount: 1 },
  ]),

  LibraryController.createLibrary
);
Library.post("/createRoom", LibraryController.createRoom);
Library.post("/updateRoom", LibraryController.addOrUpdateRoomDetails);
Library.get("/getLibrary", LibraryController.getLibrary);
Library.post("/getAllLibrary", LibraryController.getAllLibrary);
Library.get("/getLibrarybyUserId", LibraryController.getLibraryByUserId);
Library.post("/updateStatus", LibraryController.updateApproveStatus);
Library.post("/getLibraryById", LibraryController.getLibraryById);
Library.post("/getAdminLibraries", LibraryController.getAdminLibraries);
Library.post("/getAllBookings", LibraryController.getAllBookings);

module.exports = Library;
