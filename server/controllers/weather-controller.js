const request = require("request")



//gets Weather from OpenWeatherMap and pass data to callback
exports.getWeather= async (req,res,next)=>{

    var params = req.query

    console.log(params)

    if(params["lat"]){
        getWeatherFromCoordinates(params,(err,data)=>{
            if (err!=null){
                //throw error
            }
            res.send(JSON.parse(data.body))
        })
    }
    else if(params["zip"]){
        getWeatherFromZipCode(params,(err,data)=>{
            if (err!=null){
                //throw error
            }
            res.send(JSON.parse(data.body))
        })
    }
    else {
        res.sendStatus(418)
    }




}

//If countrycode not specified default is SouthAfrica
function getWeatherFromZipCode(params,nextFunction){

    var zipcode = params["zip"]
    var countrycode = params["countrycode"]||"ZA"
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

    request(options,(err,data)=>{
        nextFunction(err,data)
    })
}

function getWeatherFromCoordinates(params,next){


    var lat = params.getNamedItem("lat")
    var lon = params.getNamedItem("lon")
    let options = {
        url: "https://api.openweathermap.org/data/2.5/weather",
        method: 'GET',
        qs: {
            lat: lat,
            lon:lon,
            appid:'7b25fd89096db406853de3ba537ecd99',
        }
    }

    request(options,next)

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
        if (err!==null){
            res.send({err:err.toString()})
            return
        }
        res.send(data)
    })
}

