const upload = (req, res) => {
    if (req.files) {
        const file = req.files.filename,
            filename = file.name;
        file.mv("./upload/" + filename, err => {
            if (err)
                res.send("error");
            else
                res.send("done");
        })
    }
}
module.exports.upload = upload;