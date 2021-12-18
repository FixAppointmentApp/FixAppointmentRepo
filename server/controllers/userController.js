const multer = require("multer");

//after testing it on postman
const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/");
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split("/")[1]; //info from terminal
    callback(null, `image-${Date.now()}.${ext}`);
  },
});
//filter only image
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Upload only images!"));
  }
};

const upload = multer({
  //dest: "public/", replace it with the multerConfig
  storage: multerConfig,
  fileFilter: isImage,
});

exports.uploadImage = upload.single("photo");

exports.upload = (req, res) => {
  //check if it works
  console.log(req.file);

  res.status(200).json({
    success: "Success",
  });
};
