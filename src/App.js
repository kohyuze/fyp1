import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Start from './Start';
import RatingAnalysis from './RatingAnalysis';
import SizingAnalysis from './SizingAnalysis';
import Interpolation from './Interpolation';
import Graphics from './Graphics';
import Data from './Data';
import WaterCoolerSizing from './WaterCoolerSizing';


//this function only redirects the pages according to the url
function App() {
  return (
    <div className="App">
      <div className="content">
        <Router>
            <Switch>
              <Route exact path="/">
                <Start />
              </Route>
              <Route path="/RatingAnalysis">
                <RatingAnalysis />
              </Route>
              <Route path="/SizingAnalysis">
                <SizingAnalysis />
              </Route>
              <Route path="/Data">
                <Data />
              </Route>
              <Route path="/Interpolation">
                <Interpolation />
              </Route>
              <Route path="/Graphics">
                <Graphics />
              </Route>
              <Route path="/WaterCoolerSizing">
                <WaterCoolerSizing />
              </Route>
              {/* <Route path="*">
                <NotFound />
              </Route> */}
            </Switch>
          </Router>
        </div>
    </div>
  );
}

export default App;
