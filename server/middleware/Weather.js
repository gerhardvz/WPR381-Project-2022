
var weatherCodes = [
    {id:200,group:"Thunderstorm" ,description:"thunderstorm with light rain" ,icon:11},
    {id:201,group:"Thunderstorm" ,description:"thunderstorm with rain" ,icon:11},
    {id:202,group:"Thunderstorm" ,description:"thunderstorm with heavy rain" ,icon:11},
    {id:210,group:"Thunderstorm" ,description:"light thunderstorm" ,icon:11},
    {id:211,group:"Thunderstorm" ,description:"thunderstorm" ,icon:11},
    {id:212,group:"Thunderstorm" ,description:"heavy thunderstorm ",icon:11},
    {id:221,group:"Thunderstorm" ,description:"ragged thunderstorm" ,icon:11},
    {id:230,group:"Thunderstorm" ,description:"thunderstorm with light drizzle" ,icon:11},
    {id:231,group:"Thunderstorm" ,description:"thunderstorm with drizzle" ,icon:11},
    {id:232,group:"Thunderstorm" ,description:"thunderstorm with heavy drizzle" ,icon:11},
    {id:300,group:"Drizzle" ,description:"light intensity drizzle" ,icon:9},
    {id:301,group:"Drizzle" ,description:"drizzle" ,icon:9},
    {id:302,group:"Drizzle" ,description:"heavy intensity drizzle" ,icon:9},
    {id:310,group:"Drizzle" ,description:"light intensity drizzle rain ",icon:9},
    {id:311,group:"Drizzle" ,description:"drizzle rain ",icon:9},
    {id:312,group:"Drizzle" ,description:"heavy intensity drizzle rain ",icon:9},
    {id:313,group:"Drizzle" ,description:"shower rain and drizzle ",icon:9},
    {id:314,group:"Drizzle" ,description:"heavy shower rain and drizzle" ,icon:9},
    {id:321,group:"Drizzle" ,description:"shower drizzle" ,icon:9},
    {id:500,group:"Rain" ,description:"light rain" ,icon:10},
    {id:501,group:"Rain" ,description:"moderate rain ",icon:10},
    {id:502,group:"Rain" ,description:"heavy intensity rain" ,icon:10},
    {id:503,group:"Rain" ,description:"very heavy rain" ,icon:10},
    {id:504,group:"Rain" ,description:"extreme rain ",icon:10},
    {id:511,group:"Rain" ,description:"freezing rain" ,icon:13},
    {id:520,group:"Rain" ,description:"light intensity shower rain ",icon:9},
    {id:521,group:"Rain" ,description:"shower rain ",icon:9},
    {id:522,group:"Rain" ,description:"heavy intensity shower rain" ,icon:9},
    {id:531,group:"Rain" ,description:"ragged shower rain ",icon:9},
    {id:600,group:"Snow" ,description:"light snow" ,icon:13},
    {id:601,group:"Snow" ,description:"Snow" ,icon:13},
    {id:602,group:"Snow" ,description:"Heavy snow" ,icon:13},
    {id:611,group:"Snow" ,description:"Sleet" ,icon:13},
    {id:612,group:"Snow" ,description:"Light shower sleet" ,icon:13},
    {id:613,group:"Snow" ,description:"Shower sleet" ,icon:13},
    {id:615,group:"Snow" ,description:"Light rain and snow" ,icon:13},
    {id:616,group:"Snow" ,description:"Rain and snow" ,icon:13},
    {id:620,group:"Snow" ,description:"Light shower snow" ,icon:13},
    {id:621,group:"Snow" ,description:"Shower snow ",icon:13},
    {id:622,group:"Snow" ,description:"Heavy shower snow ",icon:13},
    {id:701,group:"Mist" ,description:"mist" ,icon:50},
    {id:711,group:"Smoke" ,description:"Smoke" ,icon:50},
    {id:721,group:"Haze" ,description:"Haze" ,icon:50},
    {id:731,group:"Dust" ,description:"sand / dust whirls" ,icon:50},
    {id:741,group:"Fog" ,description:"fog" ,icon:50},
    {id:751,group:"Sand" ,description:"sand" ,icon:50},
    {id:761,group:"Dust" ,description:"dust" ,icon:50},
    {id:762,group:"Ash" ,description:"volcanic ash" ,icon:50},
    {id:771,group:"Squall" ,description:"squalls" ,icon:50},
    {id:781,group:"Tornado" ,description:"tornado" ,icon:50},
    {id:800,group:"Clear" ,description:"clear sky" ,icon:1},
    {id:801,group:"Clouds" ,description:"few clouds: 11-25%" ,icon:2},
    {id:802,group:"Clouds" ,description:"scattered clouds: 25-50% ",icon:3},
    {id:803,group:"Clouds" ,description:"broken clouds: 51-84% ",icon:4 },
    {id:804,group:"Clouds" ,description:"overcast clouds: 85-100% ",icon:4}
]

function getWeatherFromCode(weatherCodeid,isDay,nextFunction){

    var WeatherCode = weatherCodes.find((value, index, obj) => {
        //Needs type casting as id is saved as number and received as string
        if (value.id==weatherCodeid){

            return true
        }
        return false
    })

    if (WeatherCode===undefined){
        nextFunction(new Error("WeatherCode doesn't exist"),null)
        return
    }
    let iconURL = ("https://openweathermap.org/img/wn/"+((WeatherCode.icon < 10 ? '0' : '') + WeatherCode.icon)+(isDay===true?'d':'n')+".png")
    nextFunction(null,{group:WeatherCode.group ,description:WeatherCode.description ,iconURL:iconURL})
}

module.exports = {getWeatherFromCode}