import React, { useEffect, useState } from "react"
import "./NodeMenu.scss"
import { Link, useNavigate } from "react-router-dom";
import nodesSlice, { nodeActions } from "../store/nodesSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useAppSelector } from "../store/hooks";
import { authActions } from "../store/auth-slice";
import { BASE_URL } from "../config";

const NodeMenu = () => {

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nodes = useAppSelector((state) => state.nodes.nodes);
  const currentNodeId = useAppSelector((state) => state.nodes.currentNodeId);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goNodeAbove = () => {
    const node = nodes.find((element) => element.id === currentNodeId);
    if(node){
    sessionStorage.setItem("currentNodeId", node!.nodeAbove.toString())
    dispatch(nodeActions.updateCurrentNodeId());
    }
  }

  const onLogOut = () => {
    dispatch(authActions.logout());
  }
    
  return (
    <div className="menuContainer">
      <div className="menuButton" onClick={openModal}>New node</div>
      <Link to={"/Home"}><div className="menuButton">Home Page</div></Link>
      <Link to={"/NotesPage"}><div className="menuButton">Notes Page</div></Link>
      <div className="menuButton" onClick={goNodeAbove}>Node above</div>
      <div className="menuButton" onClick={onLogOut}>Log out</div>

      <div className="createNewNodeWindowContainer">
       
      <div>
      <Modal isOpen={isModalOpen} onClose={closeModal}/>

    </div>
     
     </div>
    </div>
  )
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>(''); // State to store the input value
  const user = useAppSelector((state) => state.auth.loggedInUser);
  const currentNodeId = useAppSelector((state) => state.nodes.currentNodeId);

  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update the input value as the user types
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); 
   
    const params = {
      user: user,
    };

    //Update database
    axios.post(`${BASE_URL}/api/Nodes/CreateNode`, {
      "name": inputValue,
      "notes": "",
      "nodeAbove": currentNodeId.toString(),
      "user": user,
    })
      .then((response) => {
        axios.get(`${BASE_URL}/api/Nodes/GetNodes`, {params})
        .then((response) => {
          dispatch(nodeActions.updateNodeList(response.data))
          onClose();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };
  
  return (
    <div>
      <div className={isOpen? "popUpContainer" : "displayNone"}>
         <form onSubmit={handleSubmit}>
          <input
            className="createNodeInput"
            type="text"
            placeholder="Node name"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button type="submit" className="submitButton">Submit</button>
        </form>
        <button onClick={onClose} className="closeButton">Close</button>
      </div>
      <div className={isOpen? "popUpBackground" : "displayNone"} onClick={onClose} />
    </div>
  );
};

export default NodeMenu;

