var countries = [{name:"South Africa",alpha2:"ZA"}]

function getCountryCodeByName(name){

    var countryObj = countries.find((value, index, obj) => {
        if (value.name===name){
            return true
        }
    })
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