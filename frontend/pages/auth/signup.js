import React from 'react';
import CredentialsSignUp from "../../components/CredentialsSignUp";
import SocialSignup from "../../components/SocialSignup";
import { getSocialAuthLinks } from "../../helpers/getSocialAuthLinks";

const SingUp = ({googleService, facebookService}) => {
  return (
    <>
      <CredentialsSignUp title="Sign Up with Email" buttonText="Sign Up with credentials" />
      <SocialSignup url={facebookService} service="Sign Up with Facebook" styleButton="auth_facebook" />
      <SocialSignup url={googleService} service="Sign Up with Google" styleButton="auth_google" />
      <SocialSignup url='/auth/login' service="Have an account? Login" styleButton="mt-2 w-full flex justify-center py-2 px-4 " />
    </>
  );
};

export async function getStaticProps(context) {
  let [googleService, facebookService] = await getSocialAuthLinks();
  return {
    props: {
      googleService, facebookService
    },
    revalidate: 60,
  }
}

export default SingUp;
