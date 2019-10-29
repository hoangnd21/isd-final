const equipment = require('../models/equipments');
const accessories = require("../models/accessories")

const searchEquipments = (req, res) => {
    equipment.find(req.query).sort({ created_at: -1 }).lean().exec()
        .then(data => {
            res.send(data);
        }
        )
}
module.exports.searchEquipments = searchEquipments;

const searchAccessories = (req, res) => {
    accessories.find(req.query).sort({ created_at: -1 }).lean().exec()
        .then(data => {
            res.send(data);
        }
        )
}
module.exports.searchAccessories = searchAccessories;