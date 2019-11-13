const mongoXlsx = require('mongo-xlsx');

const uploading = (req, res) => {
    if (req.files) {
        let uploadFile = req.files.file
        const fileName = uploadFile.name
        uploadFile.mv("./upload/" + fileName, err => {
            if (err)
                res.send("error");
            else
                res.send("1 file is uploaded")
        })
    }
    else
        res.send("no file to upload")
}
module.exports.uploading = uploading;

const importExcel = (req, res) => {
    if (req.files) {
        let uploadFile = req.files.file
        const fileName = uploadFile.name
        uploadFile.mv("./upload/" + fileName, err => {
            if (err)
                console.log("error");
            else
                var model = null;
            // var model = mongoXlsx.buildDynamicModel(
            //     [
            //         {
            //             "_id": 'id',
            //             "name": 'Name',
            //             "code": 'Code',
            //             "generalType[0]": 'general Type',
            //             "subtype[0]": 'Subtype',
            //             "lockStatus[0]": 'Lock Status',
            //             "eqStatus[0]": 'Equipment Status',
            //             "datePurchase": 'Date Purchase',
            //             "originalPrice": 'Original Price',
            //             "warrantyMonths": 'Warranty(Months)',
            //             "batch[0]": 'Batch',
            //             "startDate": 'Start Date',
            //             "manufacturer": 'Manufacturer',
            //             "created_at": 'Created_at',
            //         }
            //     ]
            // );
            mongoXlsx.xlsx2MongoData(`./upload/${fileName}`, model, function (err, mongoData) {
                res.send(mongoData);

            });
        })

    }
    else
        res.send("no file to upload")

}
module.exports.importExcel = importExcel