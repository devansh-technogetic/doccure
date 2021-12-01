import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component:Component ,role:Role, ...rest})=>{

  const data = JSON.parse(localStorage.getItem('token'));
  console.log(Role, "role", data);

  return(  
      
      // if token and role===givenRoutes then role based routes is available
      // otherwise redirect user to login/home page

      <Route {...rest} render={props=>(
      data && data.token && data.role===Role ?
        <Component {...props} /> :
        <Redirect to='/' />
      )}  
      />
  )
}

export default PrivateRoute;