import React, { useEffect, useState } from "react"
import "./HomeMenu.scss"
import { Link, useNavigate } from "react-router-dom";
import nodesSlice, { nodeActions } from "../store/nodesSlice";
import { useDispatch } from "react-redux";
import { apiSlice, useGetNodesQuery } from "../api/apiSlice";
import axios from "axios";
import { NodeModel } from "../models/NodeModel";
import { useAppSelector } from "../store/hooks";
import store from "../store";
import { Formik } from "formik";
import { authActions } from "../store/auth-slice";

const HomeMenu = () => {
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

      {isLoggedIn ?  <Link to={"/TreeOverview"}>
        <div className="menuButton" >Tree Overview</div>
      </Link> :
      <div/>}

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

export default HomeMenu;

