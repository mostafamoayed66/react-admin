import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, getInitialData } from './actions';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Signout = React.lazy(() => import('./views/pages/signout/Signout'));
const Register = React.lazy(() => import('./views/pages/register/Register'));

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  //componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      dispatch(getInitialData());
    }
  }, [auth.authenticate, dispatch]);

  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route path="/login" name="Login Page" component={Login} />
          <Route path="/signout" name="Signout Page" component={Signout} />
          <Route path="/register" name="Register Page" component={Register} />
          <PrivateRoute path="/" name="Home" component={TheLayout} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );

}

export default App;
