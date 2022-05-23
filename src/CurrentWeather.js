import * as React from 'react';
import {Link, useLocation} from 'react-router-dom';

const CurrentWeather = () => {

    const location = useLocation();
    const [isFahrenheit, setChecked] = React.useState(false);
    // This is how you can get the zipcode:
    // location.state.userZipcode

    // Example method of getting data from API, and sending data:
    const fetchData = async ()=>{

        if (location.state!=undefined){
            //Data been passed through
            var unit = "metric"
            var userLocation = location.state.userLocation
            var zipLocation = location.state.userZipcode

            let url = new URL('/api/weather','http://'+window.location.host)
            url.host = window.location.host
            url.pathname = '/api/weather'
            url.port = window.location.port

            isFahrenheit?unit="imperial":unit="metric"

            if (zipLocation!=undefined){
                url.search = new URLSearchParams({zip:zipLocation,unit:unit}).toString();
            }
            else if (userLocation!=undefined){
                url.search = new URLSearchParams({lat:userLocation.lat, long:userLocation.lon,unit:unit}).toString();
            }

           const reply = await fetch(url)
            const jsonReply = await reply.json()
            console.log(jsonReply)
        }

    }
    fetchData()


    
    const handleChange = () => {
        setChecked(!isFahrenheit);


    };
    return ( 
        <div>
            <div>
                <Link to='/'><button className='homeBtn'>Home</button></Link>
              </div>
            <div className='tempUnit'>
                <Checkbox
                    label="Temperature in Fahrenheit"
                    value={isFahrenheit}
                    onChange={handleChange}
                    name = "isFahrenheit"
                />
            </div>
            <div className='weatherCardContainer'>
                <div className='weatherCard'>
                    <div className='conditionsOverview'>
                        <p>Current Temperature: °</p>
                        <p>Condition description:</p>
                    </div>
                    <div className='conditionDetails'>
                        <p>Humidity: % </p>
                        <p>Wind Speed:  mph </p>
                    </div>
                </div>
                <h4> Location |  </h4>
            </div>
        </div> 
      );
}

const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
};
 
export default CurrentWeather;