import React from "react"
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";

const TreeMenu = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const loggedInUser = useAppSelector(state => state.auth.loggedInUser)
    const dispatch = useDispatch();
  
    const onLogOut = () => {
      dispatch(authActions.logout());
    }
  
    return (
      <div className="menuContainer">
        <div className="logo">
          <h2>No</h2><h4>te</h4><h2>Brain</h2>
        </div>
  
        <Link to={"/Home"}><div className="menuButton">Home page</div></Link>

        {isLoggedIn ?  <Link to={"/NodeOverview"}>
          <div className="menuButton">Node Overview</div>
        </Link> :
        <div/>}
  
        
        <div className="menuButton">About App</div>
  
        {isLoggedIn ? 
        
        <div className="menuButton" onClick={onLogOut}>Log out</div>:
  
        <Link to={"/Login"}>
          <div className="menuButton">Login</div>
        </Link>}
  
        <div className="loginStatus">  {isLoggedIn ? loggedInUser : "You are not logged in "}</div>
      </div>
    )
};

export default TreeMenu;
