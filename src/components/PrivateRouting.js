import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserName } from "../features/user/userSlice";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userName = useSelector(selectUserName);

  return (
    <Route
      {...rest}
      render={(props) =>
        !userName ? <Redirect to='/login' /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
