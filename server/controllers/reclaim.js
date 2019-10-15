const equipmentDistribution = require('../models/equipmentDistribution');

const getOneEquipmentDistributionByEquipId = (req, res) => {
    const getOneEquipmentDistributionByEquipId = equipmentDistribution.findOne({ device: req.params.id, status: "In Use" }).exec()
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