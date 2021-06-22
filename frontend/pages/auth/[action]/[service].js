import React, {useContext, useEffect} from 'react';
import axios from '../../../helpers/api.js'
import { AUTH_TYPES } from "../../../context/auth/authReducer";
import {useRouter} from "next/router";
import AuthContext from "../../../context/auth/authContext";
import cookie from 'cookie';

const Service = ({userData}) => {
  const router = useRouter();

  const authContext = useContext(AuthContext);
  const { authenticateUser } = authContext;

  useEffect(() => {
    if (userData) {
      authenticateUser(userData);
      router.replace('/business')
    }
  },[userData])


  return (
    <div className="max-w-md mx-auto max-w-prose px-3.5">
        <h1>
          hello
        </h1>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params,resolvedUrl, req, res } = context;

  const urlTransformed  = resolvedUrl.replace(`/auth/signup/${params.service}`,'');
  const response = await axios.get(`auth/social/${params.service}/callback${urlTransformed}`);
  if (response.status === 200) {
   res.setHeader("Set-Cookie", cookie.serialize("token", response.data.access_token, {
      httpOnly: true,
      secure: false,
      maxAge: response.data.expires_in,
      sameSite: "Strict",
      path: "/"
    }))
    return {
      props: {
        userData : response.data,
      },
    }
  }
  return {
    redirect: {
      destination: `/auth/${params.service}`
    }
  }
}

export default Service;
