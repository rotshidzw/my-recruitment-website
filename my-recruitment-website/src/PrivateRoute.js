import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isLoggedIn = Cookies.get('isLoggedIn') === 'true';

  return isLoggedIn ? (
    <Route {...rest} element={<Element />} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
