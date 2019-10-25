const liquidation = require('../models/liquidation');

const addLiquidation = (req, res) => {
    now = Date.now();
    liquidation.create({
        userId: req.body.userId,
        status: req.body.status,
        equipId: req.body.equipId,
        accessories: req.body.accessories,
        create_at: now,
    });
    res.send("1 document created successfully");
};
module.exports.addLiquidation = addLiquidation;

const getAllLiquidation = (req, res) => {
    const getAllLiquidation = liquidation.find({}).exec()
        .then((getAllLiquidation) => {
            if (getAllLiquidation) {
                res.send(getAllLiquidation);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getAllLiquidation = getAllLiquidation;

const getOneLiquidation = (req, res) => {
    const getOneLiquidation = liquidation.findById(req.params.id).exec()
        .then((getOneLiquidation) => {
            if (getOneLiquidation) {
                res.send(getOneLiquidation);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getOneLiquidation = getOneLiquidation;

const updateLiquidation = (req, res) => {
    const updateLiquidation = liquidation.findById(req.params.id).exec()
        .then((updateLiquidation) => {
            if (updateLiquidation) {
                const newValue = { $set: req.body };
                liquidation.updateOne(updateLiquidation, newValue, (err, res) => {
                    if (err) throw err;
                    else
                        console.log("1 document updated");

                })
                res.send("1 document updated");
            }
        })
};
module.exports.updateLiquidation = updateLiquidation;

const deleteLiquidation = (req, res) => {
    const deleteLiquidation = liquidation.findById(req.params.id).exec()
        .then((deleteLiquidation) => {
            if (deleteLiquidation) {
                liquidation.deleteOne(deleteLiquidation, (err, res) => {
                    if (err) throw err;
                    console.log("1 document deleted");

                })
                res.send("1 document deleted successfully");
            }
        })
};
module.exports.deleteLiquidation = deleteLiquidation; 