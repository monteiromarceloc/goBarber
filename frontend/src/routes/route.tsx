import React from 'react';
import { Route as ReactDOMRoute, RouteProps as RP, Redirect } from "react-router-dom";

import { useAuth } from './../hooks/Auth';

interface RouteProps extends RP {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  const { name } = useAuth();
  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!name ? <Component />
          : <Redirect to={{
            pathname: isPrivate ? '/' : 'home',
            state: { from: location }
          }} />
      }}
    />
  )
}

export default Route;
