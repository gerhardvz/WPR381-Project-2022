const express=require("express")
const bodyParser = require("body-parser")

// var multer = require('multer');
// var upload = multer();
const PORT = process.env.PORT || 8080
// Creating express server
const app=express()
app.use(express.json());



app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.array());
// app.use(express.static('public'));
// Importing all the routes

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
    app.get('*', (req, res) => {
        res.sendFile('build/index.html', { root: __dirname })
    })
}

const routes = require("./routes/routes");

// Handling routes request
app.use("/",routes)


app.listen((PORT),()=>{
    console.log("Server is Running")
})