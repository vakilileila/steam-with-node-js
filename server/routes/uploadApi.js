
module.exports = function (app, express) {
    var apiRouter = express.Router();

    apiRouter.route('/upload')
        .post(function (req, res) {
            debugger;
            res.send({fileName: req.files.file.path});
        });

    return apiRouter;
}
