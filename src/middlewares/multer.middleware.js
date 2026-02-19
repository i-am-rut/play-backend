import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure temp directory exists
const tempDir = path.join(process.cwd(), "public/temp");
if (!fs.existsSync(tempDir)) {
	fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, tempDir)
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
		const ext = path.extname(file.originalname)
		cb(null, file.fieldname + "-" + uniqueSuffix + ext)
	},
})

// File filter (ONLY images & videos)
const fileFilter = (req, file, cb) => {
	const allowedTypes = [
		"image/jpeg",
		"image/png",
		"image/webp",
		"video/mp4",
		"video/mkv",
		"video/quicktime"
	]

	if (allowedTypes.includes(file.mimetype)) {
		cb(null, true)
	} else {
		cb(new Error("Unsupported file type"), false)
	}
}

export const upload = multer({
	storage,
	fileFilter,
	limits: {
		fileSize: 1024 * 1024 * 200, // 200MB max 
	},
})


