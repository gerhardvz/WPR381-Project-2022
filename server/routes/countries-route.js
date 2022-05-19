const express=require("express")

const router=express.Router()


var countryController = require("../controllers/country-controller")
router.get("/countries/list",countryController.getCountryList)
router.get("/countries/code",countryController.getCountryCode)
// Importing the routes
module.exports=router