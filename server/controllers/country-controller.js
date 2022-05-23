const countries = require("../middleware/Countries");


exports.getCountryList = async (req, res) => {
    res.send({data: countries.listCountries()})
}

exports.getCountryCode = async (req, res) => {
    var params = req.query
    //checking if country object was null and sending error
    if(!countries.getCountryCodeByName(params["country"])){return res.status(400).json('Could not find country')}

    res.send({data: countries.getCountryCodeByName(params["country"])})
}