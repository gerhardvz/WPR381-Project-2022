var countries = [{name:"South Africa",alpha2:"ZA"}]

function getCountryCodeByName(name){

    var countryObj = countries.find((value, index, obj) => {
        return value.name===name
    })
    //sends null obj if could not find country
    if(!countryObj){return null}
    return {alpha2:countryObj.alpha2}

}
function listCountries(){

    var list=[]
    countries.map(value => {
        list.push(value.name);
    })

    return {countries:list}

}

module.exports = {getCountryCodeByName,listCountries}