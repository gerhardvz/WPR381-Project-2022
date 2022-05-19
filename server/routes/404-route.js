// Importing express module
const express=require("express")
const router=express.Router()


router.get("/404",(req,res,next)=>{

    res.send("404: Page Not Found")
})
// Handling request using routes



// Importing the routes
module.exports=router
