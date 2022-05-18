const CurrentWeather = () => {
    return ( 
        <div>
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
 
export default CurrentWeather;