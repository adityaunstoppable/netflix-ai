import React, { useEffect, useState } from "react";
import { ASK_AI_PATH, BROWSE_PATH, MAIN_LOGO } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import NetflixRedButton from "../common/NetflixRedButton";
import { removeUser } from "../../redux/userSlice";

const Header = () => {
  const userEmail = useSelector((state) => state?.user?.email);
  const [headerMargin, setHeaderMargin] = useState("");
  const [showAskAi, setShowAskAi] = useState(false)
  let location = useLocation();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (location.pathname === BROWSE_PATH) {
      setHeaderMargin("mt-32");
      setShowAskAi(true)
    } else {
      setHeaderMargin("");
      setShowAskAi(false)
    }

  }, [location.pathname]);

  const handleLogoClick = () => {
    if (userEmail) {
      navigateTo(BROWSE_PATH);
    } else {
      navigateTo("/");
    }
  };

  const handleSignOut = () => {
    dispatch(removeUser());
    navigateTo("/");
  };

  return (
    // <div className='items-center flex'>
    //   <Grid container spacing={2}>
    //     <Grid item xs={2}>
    //         <img src={MAIN_LOGO} width='150px' className='ml-4' alt='main_logo'/>
    //     </Grid>
    //     <Grid item xs={9}>{/*blank space in between logo and util buttons*/}</Grid>
    //     <Grid item xs={1}>
    //         <button className='py-2 px-4 mt-3 items-center flex text-white font-semibold bg-red-600 rounded-md'>Sing In</button>
    //     </Grid>
    //   </Grid>
    // </div>

    <div
      className={`fixed flex bg-gradient-to-b from-black w-[100%]  h-52 ${headerMargin} `}
    >
      <div className="pt-3 pl-3">
        <img
          onClick={handleLogoClick}
          src={MAIN_LOGO}
          width="200px"
          className="cursor-pointer"
          alt="main_logo"
        />
      </div>

      {userEmail && (
        <div className="text-white ml-auto -mt-2">
          <NetflixRedButton
            onClickFn={handleSignOut}
            customWidth={"100px"}
            label={"Sign Out"}
            customTailwindCss="mr-3"
          />

          {showAskAi && (
            <button
              onClick={() => navigateTo(ASK_AI_PATH)}
              className="py-2 mr-5 w-[100px] bg-purple-900 hover:bg-purple-950 mt-8 rounded-sm text-white font-semibold"
            >
              Ask AI ✨
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
