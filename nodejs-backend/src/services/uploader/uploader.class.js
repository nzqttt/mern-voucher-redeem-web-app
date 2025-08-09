const fs = require("fs");
const path = require("path");
const util = require("util");
const multer = require("multer");
const { BadRequest } = require("@feathersjs/errors");

const mkdir = util.promisify(fs.mkdir);
const unlink = util.promisify(fs.unlink); // ✅ Use async unlink
const UPLOAD_DIR = path.resolve(__dirname, "../../../public/uploads");

// File restrictions
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"];
const MAX_SIZE = 2 * 1024 * 1024; // 2MB

// Multer storage config
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      await mkdir(UPLOAD_DIR, { recursive: true });
      cb(null, UPLOAD_DIR);
    } catch (err) {
      cb(new Error("Failed to create upload directory"), null);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  },
});

// Validate file types
const fileFilter = (req, file, cb) => {
  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    return cb(new BadRequest("Invalid file type. Only images are allowed."), false);
  }
  cb(null, true);
};

// Multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_SIZE },
}).single("file");

exports.Uploader = class Uploader {
  constructor(options, app) {
    this.options = options || {};
    this.app = app;
  }

  async create(data, params) {
    const { req, res, user } = params;

    if (!req || !res) {
      throw new BadRequest("Missing request/response objects");
    }

    return new Promise((resolve, reject) => {
      upload(req, res, async (err) => {
        try {
          if (err) {
            if (err.code === "LIMIT_FILE_SIZE") {
              throw new BadRequest("File size exceeds 2MB limit.");
            }
            throw new BadRequest(err.message || "File upload failed.");
          }

          const file = req.file;
          if (!file) {
            throw new BadRequest("No file uploaded.");
          }

          const url = `/uploads/${file.filename}`;

          // Optional: auto-save to user model if `params.user` is populated
          if (params.user) {
            await this.app.service('users').patch(params.user._id, {
              profileImage: url
            });
          }
          

          resolve({
            url,
            filename: file.filename,
            size: file.size,
            mimetype: file.mimetype,
          });
        } catch (error) {
          // Clean up file if something fails after upload
          if (req.file && req.file.path) {
            await unlink(req.file.path).catch(() => {});
          }
          reject(error);
        }
      });
    });
  }
};
