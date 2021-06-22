import React, { useReducer, useEffect } from 'react';
import {useRouter} from "next/router";
import AuthContext from './authContext';
import AuthReducer, {AUTH_TYPES} from './authReducer';
import api from "../../helpers/api";

const needAuth = {
    "/" : true,
    "/auth/signup" : false,
    "/auth/login" : false,
    "/business" : true,
    "/business/my-business" : true,
    "/business/create" : true,
}

const authenticatedRoutes = (route) => {
    return needAuth[route];
}
const AuthState = props => {
    const router = useRouter();

    const initialState = {
        accessToken: null,
        authenticated: false,
        user: null,
        errorMessage: null
    }


    const [state, dispatch] = useReducer(AuthReducer, initialState);


    useEffect(() => {

        const token = JSON.parse(window.localStorage.getItem('token'));
        api.get('auth/current-user', {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: AUTH_TYPES.VERIFY_USER,
                    payload: {
                        accessToken: token,
                        authenticated: true,
                        user: response.data.data
                    }
                })
            }
        }).catch(error => {
            // || authenticatedRoutes(router.pathname)
            if (error.response.data.status === 401) {
                dispatch({
                    type: AUTH_TYPES.AUTH_LOGOUT,
                })
                localStorage.removeItem('token');
                router.replace('/auth/login');
            }
        });

    },[router.pathname]);

    const loginOrSignupWithCredentials = (action, formData ) => {

        let urlRequest = ""
        if (action === "login") {
            urlRequest = 'http://localhost:8000/api/v1/auth/login';
        }
        if (action === "signUp") {
            urlRequest = 'http://localhost:8000/api/v1/auth/signup';
        }

        api.post(`${urlRequest}`, formData)
            .then((response) => {
            if(response.status === 200) {
                window.localStorage.setItem('token' , JSON.stringify(response.data.access_token));
                dispatch({
                    type: AUTH_TYPES.AUTHENTICATE_USER,
                    payload: response.data
                })
                router.replace('/')
            }
        }, (error) => {
               dispatch({
                   type: AUTH_TYPES.AUTH_ERROR,
                   payload: error.response.data
               })
        });

    }


    const authenticateUser = (data) => {
        window.localStorage.setItem('token' , JSON.stringify(data.access_token));
        dispatch({
            type: AUTH_TYPES.AUTHENTICATE_USER,
            payload: data
        })
    }



    const logoutUser = () => {
        window.localStorage.removeItem('token');
        router.replace('/auth/login')
        api.post('auth/logout',{ }, {
            headers: {
                Authorization: 'Bearer ' + state.accessToken,
            }
        })
            .then(response => {
                if (response.status === 200 ) {
                    //window.localStorage.removeItem('token');
                    dispatch({
                        type: AUTH_TYPES.AUTH_LOGOUT,
                    })
                    router.replace('/auth/login')
                }
            }).catch(error => {
            console.log(error.response)
        });

    }

    return (
        <AuthContext.Provider value={{
            accessToken: state.accessToken,
            authenticated: state.authenticated,
            user: state.user,
            errorMessage: state.errorMessage,
            authenticateUser,
            loginOrSignupWithCredentials,
            logoutUser,


        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;



/*amatos@oriontek.do*/
