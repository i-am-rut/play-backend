import fs from "fs"


function cleanupUploadedFiles(err, req, res, next) {
    if (req.files) {
        Object.values(req.files).forEach(fileArray => {
            fileArray.forEach(file => {
                try {
                    fs.unlinkSync(file.path)
                } catch (unlinkErr) {
                    console.error('Failed to remove temp file:', file.path, unlinkErr)
                }
            })
        })
    } else if (req.file) {
        try {
            fs.unlinkSync(req.file.path)
        } catch (unlinkErr) {
            console.error('Failed to remove temp file:', req.file.path, unlinkErr)
        }
    }
    // TODO: learn to handle these unlink errors
    next(err);
}

export default cleanupUploadedFiles