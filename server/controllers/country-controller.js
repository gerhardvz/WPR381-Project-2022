const countries = require("../middleware/Countries");


exports.getCountryList = async (req, res) => {
    res.send({data: countries.listCountries()})
}

exports.getCountryCode = async (req, res) => {
    var params = req.query
    res.send({data: countries.getCountryCodeByName(params["country"])})
}