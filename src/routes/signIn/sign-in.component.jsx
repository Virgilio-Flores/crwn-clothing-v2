import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const result = await signInWithGooglePopup();
    createUserDocumentFromAuth(result.user);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Signin With Google Popup</button>
    </div>
  );
};

export default SignIn;
