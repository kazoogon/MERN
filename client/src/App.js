import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'
import { setCurrentUser } from './actions/authActions';
import { logoutUser } from './actions/authActions';


//tokenをloacl storageに入れるときに使用
import jwt_dcode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';

//画面遷移してもUser loginしているかどうか毎回調べる
if(localStorage.jwtToken) {
  //localStorageにtokenあったら, headerにtoken情報持たせる
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and exp
  const decoded = jwt_dcode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check expire token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    //todo: clear current profile

    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={ Landing } />
            <div className="container">
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
