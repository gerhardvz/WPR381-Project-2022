const request = require("request")
const weather = require("../middleware/Weather");
const {response} = require("express");



//gets Weather from OpenWeatherMap and pass data to callback


exports.getWeather= async (req,res,next)=>{

        var params = req.query

        if(params["lat"] && params["lon"]){
            getWeatherFromCoordinates(params).then(data => {
                formatData(JSON.parse(data.body),(err,response)=>{
                    if (err!=null){
                        res.statusCode(500).send({err:err})
                    }
                    res.send((response))
                })

            })
            .catch(er=>{
                res.status(500).send({err:er})
            })
        }
        else if(params["zip"]){
            getWeatherFromZipCode(params).then(data=>{
                formatData(JSON.parse(data.body),(err,response)=>{
                    if (err!=null){
                        res.statusCode(500).send({err:err})
                    }
                    res.send((response))
                })
            })
            .catch(er=> {
                res.status(500).send({err:er})
            })
        }
        else {
            // res.sendStatus(418)
           res.status(400).send({mesg:'Expected param zip | [lon, lat]'})
            
        }
        
        


}

//If countrycode not specified default is SouthAfrica
function getWeatherFromZipCode(params){
    return new Promise((yay,nay)=>{
        var zipcode = params["zip"]
        if(isNaN(zipcode) ){return nay({message: 'zip must be a number',code:400})}
       // if(zipcode.length !==4){return nay({message: 'zip must be 4 digits long',code:400})}

        var countrycode = params["countrycode"]||"ZA"
        if(!isNaN(countrycode)){return nay({message: 'country code must be text', code:400})}
        if(countrycode.length !==2){return nay({message: 'country code must be 2 digits', code:400})}


        console.log(countrycode)
        var unit = (params["unit"]||"metric")
        let options = {
            url: "https://api.openweathermap.org/data/2.5/weather",
            method: 'GET',
            qs: {
                zip: zipcode+","+countrycode,
                units:unit,
                appid:'7b25fd89096db406853de3ba537ecd99',
            }
        }
        console.log(options)
        request(options,(err,data)=>{
            if(err){
                return nay({err: err})
            }
            return yay(data)
    })
    })
    
}

function getWeatherFromCoordinates(params){
    return new Promise((yay, nay) => {
        var lat = params["lat"]
        var lon = params["lon"]
        if(isNaN(lat) || isNaN(lon) ){ 
            return nay({message: 'lat | lon must be number', code: 400})
        }

        let options = {
            url: "https://api.openweathermap.org/data/2.5/weather",
            method: 'GET',
            qs: {
                lat: lat,
                lon:lon,
                appid:'7b25fd89096db406853de3ba537ecd99',
            }
        }
        console.log(options)
        request(options,(err, data) => {
            if(err) {
                return nay({err: err})
            }
            yay(data)
        })
    })
}

function formatData(data,callback){

    var id = data.weather[0].id

    var hr = (new Date()).getHours();
    var isDayTime = false;
    if (hr>6&&hr<18)
        isDayTime =true;
    weather.getWeatherFromCode(id,isDayTime,(err,Weatherdata)=>
    {
        if (err!=null){
            callback(err,null)
            return
        }
        var result={temp:data.main,city:data.name,info:Weatherdata}
        callback(null,result)
    })


}

//gets WeatherObj and pass to callback statement
exports.getWeatherInfoFromCode=async (req,res)=>{
    var weather = require("../middleware/Weather")
    var params = req.query;
    var code = params["code"]
    var hr = (new Date()).getHours();
    var isDayTime = false;
    if (hr>6&&hr<18)
        isDayTime =true;

    weather.getWeatherFromCode(code,isDayTime,(err,data)=>
    {
        if (err){
            res.status(500).json({err})
            return
        }
        res.send(data)
    })
}

