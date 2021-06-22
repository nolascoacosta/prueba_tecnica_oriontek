export const BUSINESS_TYPES = {
    CREATING_BUSINESS : 'CREATING_BUSINESS',
    BUSINESS_CREATED : 'BUSINESS_CREATED',
    BUSINESS_ERROR : 'BUSINESS_ERROR',
    CONSULTANDO_EMPRESA : 'CONSULTANDO_EMPRESA',
    CONSULTANDO_CLIENTE : 'CONSULTANDO_CLIENTE',
}

const BusinessReducer = (state, action) => {
    switch (action.type) {
        case BUSINESS_TYPES.CREATING_BUSINESS:
            return {
                ...state,
                creating: true,
                created: false,
            }
        case BUSINESS_TYPES.BUSINESS_CREATED:
            return {
                ...state,
                creating: false,
                created: true,
                error: true,
            }
        case BUSINESS_TYPES.BUSINESS_ERROR:
            return {
                ...state,
                creating: false,
                created: false,
                error: action.payload
            }
        case BUSINESS_TYPES.CONSULTANDO_EMPRESA:

            return {
                ...state,
                empresaActual: action.payload
            }

        case BUSINESS_TYPES.CONSULTANDO_CLIENTE:

            return {
                ...state,
                clienteActual: action.payload
            }
        default:
            return state;
    }
}

export default BusinessReducer;