const request = require("request")



//gets Weather from OpenWeatherMap and pass data to callback


exports.getWeather= async (req,res,next)=>{

        var params = req.query

        console.log(params)

        const exceptionCord = ({message, code}) => {
            res.status(code).json({message})
        }
        const exceptionZip=({message, code})=>{
            res.status(code).json({message})
        }

        //Unpacking weather data to select needed data
        const weatherDataTransform=(DATA)=>{
           const {weather, main, wind,name}=DATA
           const {id, description,icon}=weather[0]
           const {temp, humidity}=main
           const {speed}=wind
           
           res.json({id, description, icon, temp, humidity, speed, name})

        }


    
        if(params["lat"] && params["lon"]){
            getWeatherFromCoordinates(params).then(data => {
                weatherDataTransform(JSON.parse(data.body))
            })
            .catch(exceptionCord)
        }
        else if(params["zip"]){
            getWeatherFromZipCode(params).then(data=>{
                weatherDataTransform(JSON.parse(data.body))
            })
            .catch(exceptionZip)
        }
        else {
            // res.sendStatus(418)
           res.status(400).json('Expected param zip | [lon, lat]')
            
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
                return nay({message: err, code:data.cod})
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
                return nay({message: err, code: data.cod})
            }
            yay(data)
        })
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

