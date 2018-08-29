//ログインしている状態のみで見れるcomponent
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

const PrivateRoute = ({component: Component, auth, ...rest}) => (
  <Route
    {...rest}
    render = {props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: propTypes.object.isRequired
}

const mapStateToprops = state => ({
  auth: state.auth
})

export default connect(mapStateToprops)(PrivateRoute);
