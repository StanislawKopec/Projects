import React, { useEffect, useRef, useState } from "react"
import "./NodesPage.scss";
import { useAppSelector } from "../store/hooks";
import NodeComponent from "../components/NodeComponent";
import { NodeModel } from "../models/NodeModel";
import NodeMenu from "../components/NodeMenu";

const NodesPage = () => {
  const nodes = useAppSelector((state) => state.nodes.nodes);
  const [activeNodesList, setActiveNodesList] = useState<NodeModel[]>([]);

  const currentNodeId = useAppSelector((state) => state.nodes.currentNodeId);

  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const isClicked = useRef<boolean>(false);

  const coords = useRef<{
    startX: number,
    startY: number,
    lastX: number,
    lastY: number
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0
  })

  //dragging logic
  var isDragging = false;

  useEffect(() => {
    if (!boxRef.current || !containerRef.current) return;

    const box = boxRef.current;
    const container = containerRef.current;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = false;
      setTimeout(() => isDragging = true, 100)
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    }

    const onMouseUp = (e: MouseEvent) => {
      isClicked.current = false;
      coords.current.lastX = box.offsetLeft;
      coords.current.lastY = box.offsetTop;
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      
      if(nextY >=50){
        box.style.top = `${nextY}px`;
      }else if(nextY<50){
        box.style.top =`${nextY + 50}px`; 
      }
      
      if(nextX >=0)
      box.style.left = `${nextX}px`;
    }

    box.addEventListener('mousedown', onMouseDown);
    box.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseUp);

    const cleanup = () => {
      box.removeEventListener('mousedown', onMouseDown);
      box.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseUp);
    }

    return cleanup;
  }, [])

  var numDivs: number;
  const [divElements, setDivElements] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const newArray = nodes.filter(element =>element.id == currentNodeId ||element.nodeAbove == currentNodeId)
    setActiveNodesList(newArray);
  }, [nodes, currentNodeId]);

  useEffect(() => {
    numDivs = activeNodesList.length;
    let divs = [];
    for (let i = 1; i <= numDivs; i++) {
    divs.push(<NodeComponent
      key={i}
      node={activeNodesList[i-1]}
      id = {activeNodesList[i-1].id}
      isDragging={isDragging}
      boxRef={boxRef}
    />);
    setDivElements(divs);
  }
  }, [activeNodesList]);

  return (
    <main>
      <div ref={containerRef} className="mainContainer">
        <NodeMenu/>
        <div className="nodeList">
        {activeNodesList.length ? divElements : <div/> }
        </div>
      </div>
    </main>
  );
};

export default NodesPage;
