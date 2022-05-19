// Importing express module
const express=require("express")
const router=express.Router()

var weatherController = require("../controllers/weather-controller")


router.get("/weather",weatherController.getWeather)
router.get("/weather/code",weatherController.getWeatherInfoFromCode)
// Importing the routes
module.exports=router
