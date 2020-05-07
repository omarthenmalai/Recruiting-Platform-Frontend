import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Theme from './util/Theme';
import Welcome from './pages/Welcome';
import LogIn from './pages/LogIn';
import SearchJobs from './pages/SearchJobs';
import NavigationBar from "./components/NavigationBar";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile"
const theme = createMuiTheme(Theme);

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};


class App extends React.Component {
  render() {
      return (
          <MuiThemeProvider theme={theme}>
              <div className="App">
                      <NavigationBar/>
                          <div className="container">
                              <Router>
                                  <Switch>
                                      <Route path="/" exact component={Welcome}/>
                                      <Route path='/login' exact component={LogIn}/>
                                      <Route path='/jobs' exact component={Jobs}/>
                                      <Route path={'/profile'} exact component={Profile}/>
                                  </Switch>
                              </Router>
                          </div>
              </div>
          </MuiThemeProvider>
  )};
}

export default App;
