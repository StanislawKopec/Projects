import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useAppSelector } from '../store/hooks';
import { BASE_URL } from '../config';
import { nodeActions } from '../store/nodesSlice';
import { NoteModel } from '../models/NoteModel';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}
 
export const CreateNote: React.FC<ModalProps> = ({ isOpen, onClose }) => {
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

    return ReactDOM.createPortal(
    <div>
        <div className={isOpen? "popUpContainer" : "displayNone"}>
            <form onSubmit={handleSubmit}>
            <input
            className="createNodeInput"
            type="text"
            placeholder="Note name"
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

export default CreateNote;