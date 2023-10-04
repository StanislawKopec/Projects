import React, { useEffect, useRef, useState } from "react"
import "./Home.scss";
import Menu from "../components/NodeMenu";
import { useAppSelector } from "../store/hooks";
import NodeComponent from "../components/NodeComponent";
import { Link } from "react-router-dom";
import HomeMenu from "../components/HomeMenu";

const Home = () => {


  return (
    <main>
      <div className="mainContainer">
        <HomeMenu/>

        <Link to={"/NodesPage"}>
          <div className="startNode">
              Start
          </div>
        </Link>
      </div>
    </main>
  );
};

export default Home;
