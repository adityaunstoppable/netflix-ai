import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name:'gptSlice',
    initialState: {
        aiSuggestedMovies:{}
    },
    reducers: {
        addAiSuggestedMovie(state,action){
            state.aiSuggestedMovies = {
                ...state.aiSuggestedMovies,
                [action.payload.movieName] : action.payload.movieData 
            }
        },
        addTrailerKeyToMovie(state, action){
            state.aiSuggestedMovies = {
                ...state.aiSuggestedMovies, 
                [action.payload.movieName] : {
                    ...state.aiSuggestedMovies[action.payload.movieName],
                    trailerYoutubeKey: action.payload.youtubeTrailerKey
                }
            }
        }
    }
})

export const {addAiSuggestedMovie, addTrailerKeyToMovie} = gptSlice.actions;

export default gptSlice.reducer;