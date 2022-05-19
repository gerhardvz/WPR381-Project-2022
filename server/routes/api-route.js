// Importing express module
const express=require("express")
const router=express.Router()
const weatherroute=require("./weather-route.js")

const countryroute=require("./countries-route.js")

//Declare all routes here
router.use(weatherroute)
router.use(countryroute)


// Handling all request that do not match and redirect to 404 page
router.all("*",(req,res,next)=>{
    res.redirect("/404")
    // res.send("404: Page Not Found")
})
// Importing the routes
module.exports=router
