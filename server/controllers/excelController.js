const equipment = require('../models/equipments');
const excel = require('exceljs');
const mongoXlsx = require('mongo-xlsx')
var xlsx = require('node-xlsx').default;
const xlsxAllEquipment = (req, res) => {
    // console.log(Object.keys(req.query).length)
    equipment.find(req.query).sort({ created_at: -1 }).lean().exec()
        .then(
            (data) => {
                if (data.length == 0) {
                    res.send('fail');
                }
                else {
                    console.log(data)
                    /* Generate automatic model for processing (A static model should be used) */
                    // let workbook = new excel.Workbook(); //creating workbook
                    // let worksheet = workbook.addWorksheet('Equipments'); //creating worksheet

                    // /* Generate Excel */

                    // //  WorkSheet Header

                    // worksheet.columns = [
                    //     { header: 'Id', key: '_id', width: 30 },
                    //     { header: 'Name', key: 'name', width: 30 },
                    //     { header: 'Code', key: 'code', width: 10 },
                    //     { header: 'General Type', key: 'generalType[0]', width: 10 },
                    //     { header: 'subtype', key: 'subtype', width: 10 },
                    //     { header: 'Lock Status', key: 'lockStatus', width: 10 },
                    //     { header: 'Equipment Status', key: 'eqStatus', width: 10 },
                    //     { header: 'Date Purchase', key: 'datePurchase', width: 10 },
                    //     { header: 'Original Price', key: 'originalPrice', width: 10 },
                    //     { header: 'Warranty(Months)', key: 'warrantyMonths', width: 10 },
                    //     { header: 'Batch', key: 'batch', width: 10, outlineLevel: 2 },
                    //     { header: 'Start Date', key: 'startDate', width: 10 },
                    //     { header: 'Manufacturer', key: 'manufacturer', width: 10 },
                    //     { header: 'Created_at', key: 'created_at', width: 10 },
                    // ];

                    // // Add Array Rows
                    // worksheet.addRows(data);
                    // // worksheet.addRows(a);




                    // // Write to File
                    // workbook.xlsx.writeFile("equipments.xlsx")
                    //     .then(function () {
                    //         console.log("file saved!");
                    //         res.send("1 excel file exported");
                    //     });


                    /* Generate automatic model for processing (A static model should be used) */
                    var model = mongoXlsx.buildDynamicModel(
                        [
                            {
                                "_id": 'id',
                                "name": 'Name',
                                "code": 'Code',
                                "generalType[0]": 'general Type',
                                "subtype[0]": 'Subtype',
                                "lockStatus[0]": 'Lock Status',
                                "eqStatus[0]": 'Equipment Status',
                                "datePurchase": 'Date Purchase',
                                "originalPrice": 'Original Price',
                                "warrantyMonths": 'Warranty(Months)',
                                "batch[0]": 'Batch',
                                "startDate": 'Start Date',
                                "manufacturer": 'Manufacturer',
                                "created_at": 'Created_at',
                            }
                        ]
                    );

                    // /* Generate Excel */
                    mongoXlsx.mongoData2Xlsx(data, model, function (err, data) {
                        console.log('File saved at:', data.fullPath);
                        res.send("1 excel file exported successfully");
                    });

                }

            }
        )
};
module.exports.xlsxAllEquipment = xlsxAllEquipment;

const xlsxOneEquipment = (req, res) => {
    equipment.findById(req.params.id).lean().exec()
        .then(
            (data) => {
                if (data) {
                    console.log(data)
                    /* Generate automatic model for processing (A static model should be used) */
                    var model = mongoXlsx.buildDynamicModel([data]);

                    /* Generate Excel */
                    mongoXlsx.mongoData2Xlsx([data], model, function (err, data) {
                        console.log('File saved at:', data.fullPath);
                        res.send("1 excel file exported");
                    });
                }
                else {
                    res.send('fail');
                }
            }
        )
};

module.exports.xlsxOneEquipment = xlsxOneEquipment;

const importExxcel = (req, res) => {
    // var model = null;
    var model = mongoXlsx.buildDynamicModel([
        {
            "displayName": "ID",
            "access": "_id",
            "type": "string"
        },
        {
            "displayName": "Code",
            "access": "code",
            "type": "string"
        },
        {
            "displayName": "Name",
            "access": "name",
            "type": "string"
        },
        {
            "displayName": "General Type",
            "access": "generalType[0]",
            "type": "string"
        },
        {
            "displayName": "Sub Type",
            "access": "subtype[0]",
            "type": "string"
        },
        {
            "displayName": "Status",
            "access": "status[0]",
            "type": "string"
        },
        {
            "displayName": "Date Purchase",
            "access": "datePurchase",
            "type": "date"
        },
        {
            "displayName": "Price",
            "access": "originalPrice",
            "type": "number"
        },
        {
            "displayName": "Warranty(Months)",
            "access": "warrantyMonths",
            "type": "number"
        },
        {
            "displayName": "Batch",
            "access": "batch[0]",
            "type": "string"
        },
        {
            "displayName": "Start Date",
            "access": "startDate",
            "type": "date"
        },
        {
            "displayName": "Manufacturer",
            "access": "manufacturer",
            "type": "string"
        },
        {
            "displayName": "Created_at",
            "access": "created_at",
            "type": "date"
        }
    ]);
    mongoXlsx.xlsx2MongoData("./mongo-xlsx-1570847728167.xlsx", model, function (err, mongoData) {
        console.log('Mongo data:', mongoData);
        equipment.create(mongoData)
        res.send("Equipment created successfully");
    });
}
module.exports.importExxcel = importExxcel


