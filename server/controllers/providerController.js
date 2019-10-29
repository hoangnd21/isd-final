const providers = require('../models/providers');

const addProvider = (req, res) => {
    const now = Date.now()
    providers.create({
        name: req.body.name,
        address: req.body.address,
        hotline: req.body.hotline,
        contactPerson: req.body.contactPerson,
        emailCP: req.body.emailCP,
        phoneCP: req.body.phoneCP,
        warrantyPerson: req.body.warrantyPerson,
        emailWP: req.body.emailWP,
        phoneWP: req.body.phoneWP,
        note: req.body.note,
        create_at: now
    });
    res.send("Provider is successfully added");
};
module.exports.addProvider = addProvider;

const getAllProviders = (req, res) => {
    const getAllprovider = providers.find({}).sort({ created_at: -1 }).exec()
        .then((getAllprovider) => {
            if (getAllprovider) {
                res.send(getAllprovider);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getAllProviders = getAllProviders;

const getOneProvider = (req, res) => {
    const getOneProvider = providers.findById(req.params.id).exec()
        .then((getOneProvider) => {
            if (getOneProvider) {
                res.send(getOneProvider);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getOnerovider = getOneProvider;

const updateProviders = (req, res) => {
    const updateProvider = providers.findById(req.params.id).exec()
        .then((updateProvider) => {
            if (updateProvider) {
                const newValue = { $set: req.body };
                providers.updateOne(updateProvider, newValue, (err, res) => {
                    if (err) throw err;
                    else
                        console.log("1 document updated");

                })
                res.send("Provider is successfully updated");
            }
        })
};
module.exports.updateProviders = updateProviders;

const deleteProviders = (req, res) => {
    const deleteProvider = providers.findById(req.params.id).exec()
        .then((deleteProvider) => {
            if (deleteProvider) {
                providers.deleteOne(deleteProvider, (err, res) => {
                    if (err) throw err;
                    console.log("1 document deleted");

                })
                res.send("Provider is successfully deleted");
            }
        })
};
module.exports.deleteProviders = deleteProviders; 