import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (_re, _file, cb) => {
    cb(null, "public/images");
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

export const upl = multer({ storage });
