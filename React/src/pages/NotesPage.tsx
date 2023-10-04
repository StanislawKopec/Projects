import React, { useEffect, useRef, useState } from "react"
import "./NotesPage.scss"
import Menu from "../components/NodeMenu";
import { apiSlice, useEditNotesOfNodeQuery, useGetNotesOfNodeQuery } from "../api/apiSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/hooks";
import { NoteModel } from "../models/NoteModel";
import NoteComponent from "../components/NoteComponent";
import NoteMenu from "../components/NoteMenu";
import { nodeActions } from "../store/nodesSlice";
import { BASE_URL } from "../config";
const NotesPage = () => {
  
  if(sessionStorage.getItem("currentNodeId")===null){
    sessionStorage.setItem("currentNodeId", "1");
  }
  const user = useAppSelector((state) => state.auth.loggedInUser);
  const nodes = useAppSelector((state) => state.nodes.nodes);
  const notes = useAppSelector((state) => state.nodes.notes);
  const currentNodeId = useAppSelector((state) => state.nodes.currentNodeId);
  const currentNoteId = useAppSelector((state) => state.nodes.currentNoteId);
  const [textValue, setTextValue] = useState<string>('');
  const [divElements, setDivElements] = useState<JSX.Element[]>([]);
  const [currentNotesList, setCurrentNotesList] = useState<NoteModel[]>([]);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
  };

  const params = {
    user: user,
  }

  const saveNotes = () =>{
    axios.put(`${BASE_URL}/api/Notes/EditNote`, {id:currentNoteId, notes:textValue})
      .then((response) => {
        console.log('PUT request successful:', response.data);
        axios
        .get(`${BASE_URL}/api/Notes/GetAllNotes`, {params}) //Get updated notes list
        .then((response) => {
          dispatch(nodeActions.updateNoteList(response.data));
        });
      })
      .catch((error) => {
        console.error('PUT request error:', error);
      });
  }

  useEffect(() => {
    let currentNode = nodes.find((element) => element.id == currentNodeId);
    const notesIds = currentNode?.notes.match(/\d+/g);
    if (notesIds) {
      const currentNotes = notes.filter((element) => notesIds.includes(element.id.toString()))
      setCurrentNotesList(currentNotes);
    } 
  }, [currentNodeId, nodes, notes]);

  var numDivs: number;
  useEffect(() => {
    numDivs = currentNotesList.length;
    var divs = [];
    if(currentNotesList){
      for (let i = 1; i <= numDivs; i++) {
      divs.push(<NoteComponent
          key={i}
          note={currentNotesList[i-1]}
          id = {currentNotesList[i-1].id}
      />);
      setDivElements(divs);
    }
  }
  }, [currentNotesList]);

  useEffect(()=>{
    let noteInNotesArray = notes.findIndex((element)=> element.id == currentNoteId);
    if(currentNoteId)
    setTextValue(notes[noteInNotesArray].note);
  }, [currentNoteId])

  return (
    <div className="mainContainer" id="modal-root">
      <NoteMenu/>
      <div className="notesList">
        {currentNotesList.length ? divElements : <div/> }
      </div>
      <div className="currentNodeName">{(nodes.find((element) => element.id == currentNodeId))?.name}</div>
      <div className={currentNoteId ? "noteContainer": "displayNone"}>
        <textarea id="textarea" rows={4} cols={50} value={textValue}
         onChange={handleChange}/>
        <button className="saveNotesButton" onClick={saveNotes}>Save</button>
      </div>
    </div>
  );
};


export default NotesPage;
