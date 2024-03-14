import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useAppSelector } from '../store/hooks';
import { BASE_URL } from '../config';
import { nodeActions } from '../store/nodesSlice';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
export const CreateNode: React.FC<ModalProps> = ({ isOpen, onClose }) => {
const dispatch = useDispatch();
const [inputValue, setInputValue] = useState<string>(''); 
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

return ReactDOM.createPortal(
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
    </div>,
    document.body
);
};
export default CreateNode;