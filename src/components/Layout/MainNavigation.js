import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const [logoutTimer, setLogoutTimer] = useState(null);

  const isLoggedIn = authCtx.isLoggedIn;

  useEffect(() => {
    if (isLoggedIn) {
      const remainingTime = authCtx.tokenExpiration - Date.now();
      setLogoutTimer(
        setTimeout(() => {
          authCtx.logout();
        }, remainingTime)
      );
    } else {
      clearTimeout(logoutTimer);
    }
  }, [isLoggedIn, authCtx.tokenExpiration, authCtx.logout]);

  const logoutHandler = () => {
    clearTimeout(logoutTimer);
    authCtx.logout();
  };

  const resetLogoutTimer = () => {
    clearTimeout(logoutTimer);
    const remainingTime = authCtx.tokenExpiration - Date.now();
    setLogoutTimer(
      setTimeout(() => {
        authCtx.logout();
      }, remainingTime)
    );
  };
  
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
