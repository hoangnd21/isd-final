const equipmentDistribution = require('../models/equipmentDistribution');

const getOneEquipmentDistributionByEquipId = (req, res) => {
    const getOneEquipmentDistributionByEquipId = equipmentDistribution.findOne({ device: req.params.id, status: "handing" }).exec()
        .then((getOneEquipmentDistributionByEquipId) => {
            if (getOneEquipmentDistributionByEquipId) {
                res.send(getOneEquipmentDistributionByEquipId);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getOneEquipmentDistributionByEquipId = getOneEquipmentDistributionByEquipId;