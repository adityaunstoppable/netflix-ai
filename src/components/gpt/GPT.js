import { TextField, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DUMMY_MOVIE_SUGGESTIONS, QUERY_RESULTS_HELPER } from "../../constants";
import GptSuggestionMovieCard from "./GptSuggestionMovieCard";
import { getSuggestionsFromGeminiAi } from "../APIs/GeminiAiApis";
import "./GPT.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const StyledTextField = styled(TextField)({
  "& label": {
    color: "white",
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "darkorchids",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "darkorchid",
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottomColor: "darkorchid",
  },
  width: "400px",
});

const GPT = () => {
  const [query, setQuery] = useState("");
  const [aiSuggestions, setAIsuggestions] = useState(null);
  const movieDataFromStore = useSelector(
    (state) => state?.gpt?.aiSuggestedMovies
  );
  const [helperText, setHelperText] = useState(QUERY_RESULTS_HELPER);
  const [hoverState, setHoverState] = useState(null);

  const navigateTo = useNavigate();
  const userEmailFromRedux = useSelector((state) => state?.user?.email);

  useEffect(() => {
    if (!userEmailFromRedux) {
      navigateTo('/')
    }
  },[userEmailFromRedux])

  const handleAskAi = async (e) => {
    e.preventDefault()
    const completeQuery = `Suggest me 6 movie names in string separated by commas and only give names of the movie with query: ${query}. Example output - "movieName1 , movieName2 , movieName3, movieName4, movieName5, movieName6". Another example is -> if I search for bollywood suspence movies then in the output it should give me an string of 5 movies like this -> "Drishyam, Kahaani, A Wednesday, NH10, Talvar, Drishyam 2" `;
    setHelperText(QUERY_RESULTS_HELPER.loading);
    try {
      const aiResponse = await getSuggestionsFromGeminiAi(completeQuery);
      if (aiResponse && typeof aiResponse === "string") {
        let arrayOfSuggestions = aiResponse.split(/,\s*/);
        setAIsuggestions(arrayOfSuggestions);
      } else {
        setAIsuggestions(DUMMY_MOVIE_SUGGESTIONS);
      }
    } catch (error) {
      setAIsuggestions(DUMMY_MOVIE_SUGGESTIONS);
    } finally {
      setTimeout(() => {
        setHelperText(QUERY_RESULTS_HELPER.onResult);
      }, 500);
    }
  };
  return (
    <form>
      <div className="ai-bg-image bg-cover bg-center text-white pt-36 h-svh w-full">
        <div className=" bg-gradient-to-br from-purple-950 to-slate-600 w-[550px] py-3 rounded-lg flex justify-center items-center z-50 absolute left-1/2 transform -translate-x-1/2">
          <div className="p-2 ">
            <StyledTextField
              label=""
              autoComplete="off"
              focused={true}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              id="standard-basic"
              disabled={false}
              variant="standard"
              placeholder="Suggest me good to watch movies"
            />
          </div>
          <button
            onClick={(e) => handleAskAi(e)}
            type="submit"
            className=" border-purple-200 py-1 mt-1 px-5 h-8 z-50 hover:bg-purple-950 bg-purple-900 rounded-sm text-white font-semibold"
          >
            Ask AI
          </button>
        </div>

        <br></br>

        {aiSuggestions && (
          <div className="text-white ml-10 mt-20">
            <p className="text-white px-8 font-sans text-2xl">{helperText}</p>
            <div className="scrollable-cards flex overflow-x-scroll overflow-visible ml-3 mr-3 py-3 p-5">
              {aiSuggestions?.map((eachSuggestion) => (
                <div 
                onMouseOver={() => setHoverState(movieDataFromStore[eachSuggestion])}
                onMouseLeave={() => setHoverState(null)}
                >
                  <GptSuggestionMovieCard hoverState={hoverState} setHoverState={setHoverState} movieName={eachSuggestion} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default GPT;
