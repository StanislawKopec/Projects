import logo from "./logo.svg";
import {Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from "./pages/Home";
import NotesPage from "./pages/NotesPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import nodesSlice, { nodeActions } from "./store/nodesSlice";
import store from "./store";
import axios from "axios";
import { NodeModel } from "./models/NodeModel";
import NodesPage from "./pages/NodesPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RouteGuard from "./store/RouteGuard";
import NotFoundPage from "./pages/NotFoundPage";
import { useAppSelector } from "./store/hooks";
import authSlice, { authActions } from "./store/auth-slice";
import TreeOverview from "./pages/TreeOverview";
import NodeOverview from "./pages/NodeOverview";
import { BASE_URL } from "./config";


function App() {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.auth.loggedInUser);

  const params = {
    user: user,
  };

  useEffect(()=>{
    if(user)
    axios.get(`${BASE_URL}/api/Nodes/GetNodes`, {params})
        .then((response) => {
          dispatch(nodeActions.updateNodeList(response.data))
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  })
  useEffect(()=>{
    if(user)
    axios.get(`${BASE_URL}/api/Notes/GetAllNotes`, {params})
        .then((response) => {
          dispatch(nodeActions.updateNoteList(response.data))
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  })
  useEffect(()=>{
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const loggedIn = sessionStorage.getItem("isLoggedIn");
    if(loggedIn == "true"){
      dispatch(authActions.login(loggedInUser))
    }
  })
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register/>} />
      <Route path="/NotesPage" element={<RouteGuard><NotesPage /></RouteGuard>} />
      <Route path="/NodesPage" element={<RouteGuard><NodesPage /></RouteGuard>} />
      <Route path="/TreeOverview" element={<RouteGuard><TreeOverview /></RouteGuard>} />
      <Route path="/NodeOverview" element={<RouteGuard><NodeOverview /></RouteGuard>} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
