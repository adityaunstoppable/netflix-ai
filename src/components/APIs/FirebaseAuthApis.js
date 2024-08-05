import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export const signupUserFirebase = async (email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return response.user;
  } catch (error) {
    return error;
  }
};

export const signInUserFirebase = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return response.user
  } catch (error) {
    return error;
  }
};
