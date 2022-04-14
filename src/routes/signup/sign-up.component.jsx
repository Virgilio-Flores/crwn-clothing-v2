import { useState } from "react";

import {
  createUserAuthWithEmailPassword,
  createUserDocumentFromAuthEmailAndPassword,
  auth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../../components/form-input/form-input.component";
import "./sign-up.styles.scss";
import Button from "../../components/button/button.component";

const defaultFormFields = {
  email: "",
  password: "",
  displayName: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, displayName } = formFields;

  const signUpUser = async () => {
    try {
      const user = await createUserAuthWithEmailPassword(auth, email, password);
      const userDocRef = await createUserDocumentFromAuthEmailAndPassword(
        user,
        { displayName }
      );
      if (userDocRef) {
        console.log("sign up completed.", userDocRef);
      }
    } catch (error) {
      console.log("", error);
    }
  };
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpUser();
    resetFormFields();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const newFormFields = { ...formFields };
    const { name, value } = e.target;
    newFormFields[name] = value;
    setFormFields(newFormFields);
  };

  const inputOptions = [
    {
      label: "Email",
      type: "email",
      name: "email",
      value: email,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      value: password,
    },
    {
      label: "Display Name",
      type: "text",
      name: "displayName",
      value: displayName,
    },
  ];

  const mapInputOptions = () => {
    return inputOptions.map((input) => (
      <FormInput key={input.name} {...input} onChange={handleChange} />
    ));
  };
  return (
    <div className="sign-up-container">
      <h2>Do not have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        {mapInputOptions()}
        <Button buttonType="" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
