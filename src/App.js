import { Outlet, createBrowserRouter } from "react-router-dom";
import AuthPage from "./components/authPage/AuthPage";
import Browse from "./components/browse/Browse";
import GPT from "./components/gpt/GPT";
import Header from "./components/header/Header";
import "./App.css";
import { ASK_AI_PATH, BROWSE_PATH, SIGNUP_PATH } from "./constants";
import { useEffect } from "react";
import Toaster from "./components/common/Toaster";
function App() {
  
  useEffect(() => {

  },[])

  return (
    <div className="App">
      <Header />
      <Outlet />
      <Toaster />
    </div>
  );
}

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: SIGNUP_PATH, element: <AuthPage /> },
      { path: BROWSE_PATH, element: <Browse /> },
      { path: ASK_AI_PATH, element: <GPT /> },
    ],
  },
]);

export default App;
