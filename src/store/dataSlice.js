import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        items:[]
    },
    reducers: {
        addData: function(state, action){
            console.log(action);
            state.items.push(action.payload)
        },
        deleteData: (state, action) => {
            return action.payload;
        },        
    },
})



export const { addData, deleteData } = dataSlice.actions
export default dataSlice.reducer;
