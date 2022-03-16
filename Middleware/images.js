
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

exports.uploadSingleFile = (req, res) => {
   console.log(req)
   return
   // upload.single('uploaded_file')
}