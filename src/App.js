import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import Login from './Login';
import CreateAcc from './CreateAcc';
import DiscoveryGame from './DiscoveryGame/DiscoveryGame';
import Swiper from './Tester/Tester';




function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
            <Route path="/DiscoveryGame">
              <DiscoveryGame />
            </Route>
            <Route path="/Tester">
              <Swiper />
            </Route>
            
            <Route path="/CreateAccount">
              <CreateAcc />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;