import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        items: JSON.parse(localStorage.getItem("dataItems")) || []
    },
    reducers: {
        addData: function(state, action){
            console.log(action);
            state.items.push(action.payload)
            localStorage.setItem("dataItems", JSON.stringify(state.items));
        },
        deleteData: (state, action) => {
            const key = action.payload;
            state.items = state.items.filter((item) => item.key !== key);
            localStorage.setItem("dataItems", JSON.stringify(state.items));
        },
        updateData: (state, action) => {
            const { key, newData } = action.payload;
            const itemIndex = state.items.findIndex((item) => item.key === key);
            if (itemIndex !== -1) {
              state.items[itemIndex] = { ...state.items[itemIndex], ...newData };
            }
            localStorage.setItem("dataItems", JSON.stringify(state.items));
        },
    },
})



export const { addData, deleteData, updateData } = dataSlice.actions;

export default dataSlice.reducer;
