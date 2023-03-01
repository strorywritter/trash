import React, { useEffect, useState } from 'react';
import '../App.css';
import { Redirect } from "react-router-dom";
import { RequestState } from "../../RequestState";
import UserContext from '../context/UserContext';
import { User } from "../../models/User";
import { AuthService } from "../../servises/AuthService";
import { RouteName } from "../../RouteName";

function Auth({ children }) {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();
  const [userRequestState, setUserRequestState] = useState<RequestState>(RequestState.INITIAL);
  if (!token) {
   // const token = AuthService.getToken();
    if (token) {
      setToken(token);
    } else {
      return <Redirect to={RouteName.LOGIN} />;
    }
  }

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  switch (userRequestState) {
    case RequestState.FAILED:
      logout();
      return <br />;
    case RequestState.SUCCESS:
      return (
        <div>
          <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>
        </div>
      );
    default:
      return (
        <div className="pre-loader">
        </div>
      );
  }
}
export default Auth;
