export const AUTH_TYPES = {
    AUTHENTICATE_USER : 'AUTHENTICATE_USER',
    AUTH_LOGOUT : 'AUTH_LOGOUT',
    VERIFY_USER : 'VERIFY_USER',
    AUTH_ERROR : 'AUTH_ERROR',
}
const AuthReducer = (state, action) => {
    switch (action.type) {
        case AUTH_TYPES.AUTHENTICATE_USER:
            return  {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.access_token,
                authenticated: true,
                errorMessage: null
            }
        case AUTH_TYPES.AUTH_LOGOUT:
            return  {
                ...state,
                user: null,
                accessToken: null,
                authenticated: false,
                errorMessage: null
            }
        case AUTH_TYPES.VERIFY_USER:
            return  {
                ...state,
                ...action.payload,
                errorMessage: null
            }
        case AUTH_TYPES.AUTH_ERROR:
            return  {
                ...state,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}
export default AuthReducer;