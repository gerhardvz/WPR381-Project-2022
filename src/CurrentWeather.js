import * as React from 'react';
import {Link} from 'react-router-dom';

const CurrentWeather = () => {
    const [checked, setChecked] = React.useState(false);
    
    const handleChange = () => {
        setChecked(!checked);

        if(checked === true) {
            // code to change temp to fahrenheit
        }
    };
    return ( 
        <div>
            <div>
                <Link to='/'><button className='homeBtn'>Home</button></Link>
              </div>
            <div className='tempUnit'>
                <Checkbox
                    label="Temperature in Fahrenheit"
                    value={checked}
                    onChange={handleChange}
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