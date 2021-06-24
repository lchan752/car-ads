import './App.scss';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
 } from 'react-router-dom';
 import { 
  auth 
} from 'lib/firebase';
import ListAdverts from 'pages/ListAdverts';
import CreateAdvert from 'pages/CreateAdvert';
import UpdateAdvert from 'pages/UpdateAdvert';
import ViewAdvert from 'pages/ViewAdvert';
import Login from 'pages/Login';
import React from 'react';

export default function App() {
  const [user, setUser] = React.useState()
  
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => setUser(user))
    return unsubscribe
  }, [])

  function logout() {
    auth.signOut()
    window.location.replace("/login");
  }
  
  return (
    <Router>
      <nav className='topnav'>
        <ul>
          <li className='topnav__brand'>
            <Link to='/'>Car Adverts</Link>
          </li>
          {user === null ? (
            <li className='topnav__link'>
              <Link to='/login'>Login</Link>
            </li>
          ) : (
            <li className='topnav__link'>
              <a onClick={logout}>Logout</a>
            </li>
          )}
        </ul>
      </nav>
      <div className='app'>
        <Switch>
          {user === null ? (
            <Route path='/' exact component={Login}></Route>
          ) : (
            <Route path='/' exact component={ListAdverts}></Route>
          )}
          <Route path='/login' component={Login}></Route>
          <Route path='/adverts/create' component={CreateAdvert}></Route>
          <Route path='/adverts/:advert_id/update' component={UpdateAdvert}></Route>
          <Route path='/adverts/:advert_id' component={ViewAdvert}></Route>
          <Route path='/adverts' component={ListAdverts}></Route>
        </Switch>
      </div>
    </Router>
  );
}
