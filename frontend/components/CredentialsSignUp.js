import axios from 'axios';
import useForm from "../hooks/useForm";
import {useRouter} from "next/router";
import { AUTH_TYPES } from "../context/auth/authReducer";
import AuthContext from "../context/auth/authContext";
import {useContext} from "react";
import Alert from "./Alert";

const CredentialsSignUp = ({ title, buttonText, login = false }) => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const {loginOrSignupWithCredentials, errorMessage} = authContext;


  const { formValues, handleInputChange } = useForm({
      name: '',
      email: '',
      password: '',
  });

  console.log({formValues})
  const handleSubmit = (e) => {
    e.preventDefault();
    let action = "";
    if (login) {
      action = "login";
    }else {
      action = "signUp";
    }
    loginOrSignupWithCredentials(
      action,
      formValues
    );
  }

  return (
    <div className="flex flex-col justify-center ">
      <h1 className="mb-4 text-xl font-bold text-green-500 text-center">{ title }</h1>
      <form>

        {
          !login && (
              <div>
                <label htmlFor="name" className="block text-md font-medium">Full Name</label>
                <div className="mt-1">
                  <input type="text" name="name"
                         value={ formValues.name}
                         onChange={ handleInputChange }
                         className="w-full border border-green-300 px-2 py-1
                rounded-lg shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                         placeholder="Enter Name"
                  />
                </div>
              </div>
          )
        }
        <div>
          <label htmlFor="email" className="block text-md font-medium">Email Address</label>
          <div className="mt-1">
            <input type="email" name="email"
                   value={ formValues.email}
                   onChange={ handleInputChange }
                   className="w-full border border-green-300 px-2 py-1 rounded-lg
            shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                   placeholder="example@gmail.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-md font-medium">Password</label>
          <div className="mt-1">
            <input type="password"
                   value={ formValues.password}
                   onChange={ handleInputChange }
                   name="password" className="w-full border border-green-300 px-2 py-1 rounded-lg
            shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                   placeholder="Enter password"
            />
          </div>
        </div>

        {
          login && (
            <div>
              <label htmlFor="keep_sign_in" className="mt-2 ml-1 block mb-4 text-md font-medium">
                <input type="checkbox" name="keep_sign_in" /> Keep me signed in
              </label>
            </div>
          )
        }
        {
          errorMessage && (
              JSON.stringify(errorMessage)
          )
        }

        <div className="mt-3 mb-3">
          <button type="submit"
                  onClick={ (e) => handleSubmit(e)}
          className="w-full flex justify-center py-2 border border-transparent rounded-md shadow-md text-md font-medium text-white bg-green-500 hover:bg-green-600
          focus:outline-none">
            { buttonText }
          </button>
        </div>

      </form>
    </div>
  );
};

CredentialsSignUp.propTypes = {

}
export default CredentialsSignUp;
