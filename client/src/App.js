import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import { setAuthToken } from './utils/setAuthToken';

import './App.css';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {               // it runs every time the store is updated
    store.dispatch(loadUser());
  }, []);                         // adding brackets makes it only run once, like in componentDidMount()

  return(
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Switch> {/** to show either the Landing Page or the Not Found page  */}
          <Route exact path='/' component={Landing}/>
          <Route component={Routes} /> {/** these are the routes of the entire application */}
        </Switch>
        
      </Fragment>
    </Router>
  </Provider>
  )};

export default App;
