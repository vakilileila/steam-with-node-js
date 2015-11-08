var path = require('path');

module.exports = function (app, express) {
    var apiRouter = express.Router();

    apiRouter.route('/upload')
        .post(function (req, res) {
            debugger;
            var absoluteFileName = req.files.file.path;
            var fileName = path.basename(absoluteFileName);
            res.send({
                fileName: fileName.replace("uploads", fileName),
                displayFileName: '/' + absoluteFileName
            });
        });

    return apiRouter;
}
