import React, {useReducer} from 'react';
import AppContext from './appContext';
import AppReducer, { APP_TYPES } from './appReducer';

const AppState = props => {

    const initialState = {
        openedMenu: true,
        error: null,
    }

    const [state, dispatch] = useReducer(AppReducer, initialState);

    const toggleAppMenu = () => {
        dispatch({
            type: APP_TYPES.TOGGLE_MENU_APP
        })
    }
    
    return (
        <AppContext.Provider value={{
            openedMenu: state.openedMenu,
            error: state.error,
            toggleAppMenu,
        }}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppState;