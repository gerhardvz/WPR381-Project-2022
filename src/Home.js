//import * as React from 'react';
import { geolocated } from "react-geolocated";
import {Link, useHistory} from 'react-router-dom';
import React, {useState, useEffect, useRef} from 'react';


const Home = (props) => {

    const getGeoLocation = function () {
        let lat
        let lon
        if (!props.isGeolocationAvailable){
            console.log("Please enable location on your browser")
            return null;
        }
        if(!props.isGeolocationEnabled){
            console.log("Please, update your or change the browser")
            return null;
        }
        if (props.coords){
            lat = props.coords.latitude;
            lon = props.coords.longitude;
            return {"lat":lat,"lon":lon};
        }
        return null;
    }

    const [zipcode, setZipcode] = useState();
    const zipcodeRef = useRef()
    const history = useHistory();
    const locationData = getGeoLocation();

    useEffect(()=>{
        if (zipcode != null) {

            history.push('/current',
                { userZipcode : zipcode }
            )
        }
        if (locationData != null) {

            history.push('/current',
                { userLocation : locationData }
            )
        }
    },[zipcode,locationData])
    

    
    const [zipcodePlaceholder, setPlaceholder] = useState('Enter zipcode...');

    const  handelClick = () => {
        const userZipcode = zipcodeRef.current.value;

        //Checks if zipcode is 4 characters long, and is only decimals
        if(/^([0-9]){4,4}$/.test(userZipcode)){

            setZipcode(userZipcode)
        }else{
            setPlaceholder(`'${userZipcode}' is an invalid zipcode...`);
        }

        zipcodeRef.current.value = null
    };

    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked(!checked);

        if(checked === true) {
            // code to use current zip code
        }
    };   

    //
    return ( 
        <div className='home'>
            <div className='header'>
                <h1>Weather Forcast</h1>
            </div>
            <div className="instructions">
                <p>Enter a zipcode below to get the current weather conditions for that area.</p>
            </div>
            <div className='zipcodeInput'>
                <input
                    type='text'
                    placeholder= {zipcodePlaceholder}
                    name='zipcode'
                    ref={zipcodeRef}
                />
                <button onClick={handelClick}>ENTER</button>
            </div>
            <div className='currentLocation'>
                <Checkbox
                    label="Use current location"
                    value={checked}
                    onChange={handleChange}
                />
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
 
export default geolocated()(Home);