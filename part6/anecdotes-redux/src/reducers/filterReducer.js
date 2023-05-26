import {createSlice} from '@reduxjs/toolkit';

const filterSlice =createSlice({
    name: 'filter',
    initialState:'',
    reducers:{
        queryFilter(state, action){
            const words = action.payload
            state = words
            return state
        }
    }
})
/* const filterReducer = (state = "", action) => {
  
   switch (action.type) {
    case "FILTER":
        return action.payload.words;
   
    default:
        return "";
   }
}; */

/* export const queryFilter = (words) => {
    return {
        type:"FILTER",
        payload:{words}
    }
};
 */

export const {queryFilter} = filterSlice.actions;
export default filterSlice.reducer;
