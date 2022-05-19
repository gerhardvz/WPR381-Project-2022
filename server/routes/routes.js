// Importing express module
const express=require("express")
const router=express.Router()
const apiroute=require("./api-route.js")
const PageNotFoundRoute=require("./404-route.js")


//Declare all routes here
router.use('/api',apiroute)

router.use(PageNotFoundRoute)

// Handling all request that do not match and redirect to 404 page
router.all("*",(req,res,next)=>{
    res.redirect("/404")
    // res.send("404: Page Not Found")
})
// Importing the routes
module.exports=router
