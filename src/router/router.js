import React, { useContext, useEffect, useState } from 'react';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Context from '../context';
import Login from '../components/Login';
import Nav from '../components/nav';
import AdminVideoPanel from '../components/AdminVideoPanel';

export default function Routing() {
  const [login, isLogin] = useState(false);
  const [email, setEmail] = useState('');
  useEffect(() => {
    let isAuth = localStorage.getItem('login');

    if (isAuth != null && isAuth.length > 0) {
      isLogin(true);
      setEmail(isAuth);
    } else {
      console.log('hello');
    }
  }, []);
  function setLogin(user) {
    console.log('LoggedIn ');
    isLogin(true);
    setEmail(user);
    localStorage.setItem('login', user);
    console.log('localstorage');
  }
  function logout() {
    isLogin(false);
    localStorage.removeItem('login');
  }

  return (
    <Context.Provider value={[email, setEmail]}>
      <Nav home={logout} />
      <Router>
        <Switch>
          {!login ? (
            <Route
              exact
              path='/'
              component={() => <Login setLogin={setLogin} />}
            />
          ) : (
            <Route
              exact
              path='/'
              component={() => <AdminVideoPanel logout={logout} />}
            />
          )}
        </Switch>
      </Router>
    </Context.Provider>
  );
}
