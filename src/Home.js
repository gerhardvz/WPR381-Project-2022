//import * as React from 'react';
import {Link, useHistory} from 'react-router-dom';
import React, {useState, useEffect, useRef} from 'react';

const Home = () => {
    const [zipcode, setZipcode] = useState();
    const zipcodeRef = useRef()

    const [zipcodePlaceholder, setPlaceholder] = useState('Enter zipcode...');
    const history = useHistory();
    const handelClick = () => {
        const userZipcode = zipcodeRef.current.value;

        //Checks if zipcode is 4 characters long, and is only decimals
        if(/^([0-9]){4,4}$/.test(userZipcode)){
            setZipcode(userZipcode)
            history.push({
                pathname: '/current',
                state: { test : zipcode }
              })

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
 
export default Home;