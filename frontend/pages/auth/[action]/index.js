import React from 'react';
import CredentialsSignUp from "../../../components/CredentialsSignUp";
import SocialSignup from "../../../components/SocialSignup";
import axios from '../../../helpers/api.js'
const Signup = ({googleService, facebookService}) => {
  return (
    <>
      <CredentialsSignUp />
      <SocialSignup url={facebookService} service="SignUp with Facebook" />
      <SocialSignup url={googleService} service="SignUp with Google" />

    </>
  );
};

export async function getStaticProps(context) {
  let [googleService, facebookService] = await Promise.all([
    axios.get("auth/social/google").then(response => response.data).then(data => data.url),
    axios.get("auth/social/facebook").then(response => response.data).then(data => data.url)
  ]);

  return {
    props: {
      googleService, facebookService
    },
    //revalidate: 60,
    //notFound: true,
  }
}

export default Signup;
