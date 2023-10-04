import React from "react"
import "./TreeOverview.scss"
import TreeMenu from "../components/TreeMenu";
import { useAppSelector } from "../store/hooks";

const TreeOverview = () => {
    const nodes = useAppSelector((state) => state.nodes.nodes);

  return (
    <div className="treeContainer">
        <TreeMenu/>


      
    </div>
  )
};

export default TreeOverview;
