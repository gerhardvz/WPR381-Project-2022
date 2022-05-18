const Home = () => {
    const handelClick = () => {

    }
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
                <button onClick={handelClick}>ENTER</button>
            </div>
        </div>
     );
}
 
export default Home;