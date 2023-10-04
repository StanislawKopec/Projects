import React, { ReactNode, useEffect, useState } from "react"
import "./NoteMenu.scss"
import { Link, useNavigate } from "react-router-dom";
import nodesSlice, { nodeActions } from "../store/nodesSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useAppSelector } from "../store/hooks";
import ReactDOM from "react-dom";
import { NoteModel } from "../models/NoteModel";
import { authActions } from "../store/auth-slice";
import { BASE_URL } from "../config";


const NoteMenu = () => {

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
    sessionStorage.setItem("currentNodeId", node!.nodeAbove.toString())
    dispatch(nodeActions.updateCurrentNodeId());
    dispatch(nodeActions.updateCurrentNoteId(0));
  }

  const onLogOut = () => {
    dispatch(authActions.logout());
  }
    
  return (
    <div className="menuContainer">
      <div className="menuButton" onClick={openModal}>New note</div>
      <Link to={"/Home"}><div className="menuButton">Home page</div></Link>
      <Link to={"/NodesPage"}><div className="menuButton">Nodes page</div></Link>
      <Link to={"/NotesPage"}><div className="menuButton">Notes page</div></Link>
      <div className="menuButton" onClick={goNodeAbove}>Node above</div>
      <div className="menuButton" onClick={onLogOut}>Log out</div>

      <div className="createNewNodeWindowContainer">
       
      <div>
      
      <Portal isOpen={isModalOpen} onClose={closeModal}/>
    </div>
     
     </div>
    </div>
  )
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}


const Portal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [currentNotesList, setCurrentNotesList] = useState<NoteModel[]>([]);
    const currentNodeId = useAppSelector((state) => state.nodes.currentNodeId);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState<string>('');
    const notes = useAppSelector((state) => state.nodes.notes);
    const nodes = useAppSelector((state) => state.nodes.nodes);
    const user = useAppSelector((state) => state.auth.loggedInUser);

    const params = {
      user:user,
    }

    useEffect(() => {
        let currentNode = nodes.find((element) => element.id == currentNodeId);
        const notesIds = currentNode?.notes.match(/\d+/g);
        if (notesIds) {
          const currentNotes = notes.filter((element) => notesIds.includes(element.id.toString()))
          setCurrentNotesList(currentNotes);
        } 
      }, [currentNodeId, nodes, notes]);
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      if(currentNotesList.find((element) => element.name == inputValue)){
        console.log("Name already exists");
        return null;
      }

      axios
        .post(`${BASE_URL}/api/Notes/CreateNewNote`, { //Create note in notes
          name: inputValue,
          note: '',
          node: currentNodeId,
          user: user,
        })
        .then((response) => {
            var noteId = response.data;
          axios
            .get(`${BASE_URL}/api/Notes/GetAllNotes`, {params}) //Get updated notes list
            .then((response) => {
              dispatch(nodeActions.updateNoteList(response.data));
              onClose();
              axios
                .put(`${BASE_URL}/api/Nodes/CreateNewNote`, { //Update notes in current node
                    nodeId: currentNodeId,
                    noteId: noteId,
                    user: user,
                })
                .then((response) => {
                    axios.get(`${BASE_URL}/api/Nodes/GetNodes`, {params}) //Get updated nodes list
                    .then((response) => {
                        dispatch(nodeActions.updateNodeList(response.data))
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                })
                .catch((error) => {
                    console.error('Error:', error);
                  });
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
  
    const modalRoot = document.getElementById('modal-root');
  
    if (!modalRoot || !isOpen) {
      return null;
    }
  
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
      modalRoot
    );
  };

export default NoteMenu;

