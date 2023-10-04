import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NodeModel } from "../models/NodeModel";
import axios from "axios";
import { apiSlice, useGetNodesQuery } from "../api/apiSlice";
import { NoteModel } from "../models/NoteModel";

const initialState = {
  isOkay: false,
  nodes: [] as NodeModel[],
  currentNodeId: 1,
  notes: [] as NoteModel[],
  currentNoteId: 0,
}

const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    updateNodeList(state,action){
        state.nodes = action.payload;
    },
    updateCurrentNodeId(state){
      state.currentNodeId = parseInt(sessionStorage.getItem("currentNodeId")!);
    },
    updateNoteList(state,action){
      state.notes = action.payload;
    },
    updateCurrentNoteId(state, action){
      state.currentNoteId = action.payload;
    },
    },
});

export const nodeActions = nodesSlice.actions;
export default nodesSlice;
