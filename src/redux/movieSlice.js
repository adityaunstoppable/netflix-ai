import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name:'movieSlice',
    initialState:{
        autoPlayData:{},
        scrollableCards:{}
    },
    reducers:{
        updateAutoPlaydata(state, action){
            state.autoPlayData = action.payload
        },
        addMovieListWithGenre(state, action){
            state.scrollableCards = {
                ...state.scrollableCards,
                [action.payload.genreName] : action.payload.genreMovieListArr 
            }
        }
    }
})

export const {updateAutoPlaydata, addMovieListWithGenre} = movieSlice.actions;

export default movieSlice.reducer;