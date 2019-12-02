const equipmentDistribution = require('../models/equipmentDistribution');
const accDistribution = require('../models/accessoriesDistribution')

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

const getOneAccessoryDistributionByEquipId = (req, res) => {
    const getOneAccessoryDistributionByEquipId = accDistribution.findOne({ accessory: req.params.id, status: "handing" }).exec()
        .then((getOneAccessoryDistributionByEquipId) => {
            if (getOneAccessoryDistributionByEquipId) {
                res.send(getOneAccessoryDistributionByEquipId);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getOneAccessoryDistributionByEquipId = getOneAccessoryDistributionByEquipId;