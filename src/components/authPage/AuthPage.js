import React, { useEffect, useState } from "react";
import "./authPage.css";
import { TextField, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/userSlice";
import { SIGN_UP, SIGN_IN, BROWSE_PATH } from "../../constants";
import { useNavigate } from "react-router-dom";
import NetflixRedButton from "../common/NetflixRedButton";
import {
  signInUserFirebase,
  signupUserFirebase,
} from "../APIs/FirebaseAuthApis";
import { openToast } from "../../redux/toastSlice";

const StyledTextField = styled(TextField)({
  marginTop: "20px",
  width: "300px",
  "& .MuiInputLabel-root": {
    color: "white", // Label font color
    backgroundColor: "black",
    padding: "2px",
    fontSize: "13px",
  },
  "& .MuiInputBase-input": {
    color: "white", // Input value font color
    fontSize: "12px",
    "&::placeholder": {
      color: "white", // Placeholder font color
    },
    borderColor: "#ccc", // Field border color
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "4px",
    padding: "10px",
  },
  "& .MuiInputBase-input:focus": {
    borderColor: "#ccc",
  },
});

const AuthPage = () => {
  const [heading, setHeading] = useState(SIGN_IN);
  const [antiHeading, setAntiHeading] = useState(SIGN_UP);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigateTo = useNavigate();
  const userEmailFromRedux = useSelector((state) => state?.user?.email);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userEmailFromRedux) {
      navigateTo(BROWSE_PATH);
    }
  }, [userEmailFromRedux]);

  const handleTypeOfForm = (type) => {
    if (type === SIGN_UP) {
      setShowSignUpForm(true);
      setHeading(type);
      setAntiHeading(SIGN_IN);
    } else {
      setShowSignUpForm(false);
      setHeading(type);
      setAntiHeading(SIGN_UP);
    }
  };

  const handleSignIn = async (dataObj) => {
    if (!dataObj?.email || !dataObj.password) {
      setError("Please enter all fields");
    } else {
      // call api here and then dispatch
      const { email, password } = dataObj;

      const signInResponse = await signInUserFirebase(email, password);
      if (
        signInResponse.code &&
        signInResponse.code === "auth/invalid-credential"
      ) {
        setError("Incorrect email or password");
      } else {
        dispatch(
          openToast({ message: `Signing in as ${email}`, severity: "success" })
        );
        dispatch(updateUser(dataObj));
      }
    }
  };

  const handleSignUp = async (dataObj) => {
    // Sign up logic
    const { email, password } = dataObj;
    const signUpResponse = await signupUserFirebase(email, password);

    if (
      signUpResponse.code &&
      signUpResponse.code === "auth/email-already-in-use"
    ) {
      setError("Email already taken !");
    } else {
      dispatch(
        openToast({ message: `Signing in as ${email}`, severity: "success" })
      );
      dispatch(updateUser(dataObj));
    }
  };

  const handleGuestSignIn = () => {
    let guestDataObj = {
      email: "guest@aditya_netflix.com",
      password: "Test@123",
    };
    setFormData(guestDataObj);
    dispatch(
      openToast({ message: "Signing in as Guest.", severity: "success" })
    );
    setTimeout(() => {
      navigateTo(BROWSE_PATH);
      dispatch(updateUser(guestDataObj));
    }, 2000);
  };

  const handleSubmit = () => {
    if (heading === SIGN_IN) {
      handleSignIn(formData);
    } else {
      handleSignUp(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="authPage-container">
      <div className=" px-8 pt-10 pb-10 bg-black rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-white font-semibold text-3xl text-center mb-8">
          {heading}
        </h1>

        <div className="flex flex-col">
          <StyledTextField
            label="Email"
            name="email"
            type="text"
            size="small"
            value={formData.email}
            onChange={handleChange}
          />
          <StyledTextField
            label="Password"
            name="password"
            type="password"
            size="small"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <NetflixRedButton
          onClickFn={handleSubmit}
          label={heading}
          customWidth={"300px"}
        />

        {error && <p className="text-red-600 mt-3 text-center">{error}</p>}

        <p className="mt-3 text-white text-center">
          {heading === SIGN_IN
            ? "Don't have an account ?"
            : "Already have an account ?"}
          <span
            className="ml-2 text-blue-400 cursor-pointer"
            onClick={() => handleTypeOfForm(antiHeading)}
          >
            {antiHeading}
          </span>
        </p>

        <p
          onClick={handleGuestSignIn}
          className="mt-3 text-orange-300 text-center cursor-pointer"
        >
          Sign In as Guest
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
