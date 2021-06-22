export const APP_TYPES = {
    TOGGLE_MENU_APP : 'TOGGLE_MENU_APP',
    APP_ERROR : 'APP_ERROR',
}
const AppReducer = (state, action) => {
    switch (action.type) {
        case APP_TYPES.TOGGLE_MENU_APP:
            return {
                ...state,
                openedMenu: ! state.openedMenu
            }
        default:
            return state;
    }
}
export default AppReducer;