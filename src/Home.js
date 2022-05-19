import * as React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
    const [checked, setChecked] = React.useState(false);
    const handelClick = () => {
        // code to check if zip is valid
    };

    const handleChange = () => {
        setChecked(!checked);

        if(checked === true) {
            // code to use current zip code
        }
    };
      
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
                    placeholder='Enter zipcode..'
                    name='zipcode'
                />
                <Link to='/current'><button onClick={handelClick}>ENTER</button></Link>
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