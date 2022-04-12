import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import "./navigation.styles.scss";

const NavigationBar = () => {
  return (
    <Fragment>
      <div className="navigation">
        <div className="nav-links-container">
          <Link className="logo-container" to="/">
            <CrwnLogo />
          </Link>
          <Link className="nav-link" to="title">
            SHOP
          </Link>
          <Link className="nav-link" to="sign-in">
            SIGNIN
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default NavigationBar;
