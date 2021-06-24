import './App.scss';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
 } from 'react-router-dom';
import ListAdverts from 'pages/ListAdverts';
import CreateAdvert from 'pages/CreateAdvert';
import UpdateAdvert from 'pages/UpdateAdvert';
import ViewAdvert from 'pages/ViewAdvert';

export default function App() {
  return (
    <Router>
      <nav className='topnav'>
        <ul>
          <li className='topnav__brand'>
            <Link to='/'>Car Adverts</Link>
          </li>
          <li className='topnav__link'>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
      </nav>
      <div className='app'>
        <Switch>
          <Route path='/' exact component={ListAdverts}></Route>
          <Route path='/adverts/create' component={CreateAdvert}></Route>
          <Route path='/adverts/:advert_id/update' component={UpdateAdvert}></Route>
          <Route path='/adverts/:advert_id' component={ViewAdvert}></Route>
          <Route path='/adverts' component={ListAdverts}></Route>
        </Switch>
      </div>
    </Router>
  );
}
