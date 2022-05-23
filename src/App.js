import './App.css';
import Home from'./Home';
import CurrentWeather from './CurrentWeather';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/current">
            <CurrentWeather />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
