import {useContext, useReducer} from "react";
import BusinessReducer, { BUSINESS_TYPES } from "./businessReducer";
import BusinessContext from "./businessContext";
import api from "../../helpers/api";
import AuthContext from "../auth/authContext";
import {useRouter} from "next/router";
const BusinessState = props => {
    const router = useRouter();
    const { accessToken } = useContext(AuthContext);

    const initialState = {
        error: null,
        creating: false,
        created: false,
        empresaActual: null,
        clienteActual: null,
    }

    const [state, dispatch] = useReducer(BusinessReducer, initialState);

    const consultandoEmpresa = (empresa) => {
        dispatch({
            type: BUSINESS_TYPES.CONSULTANDO_EMPRESA,
            payload: empresa
        })
    }

    const consultandoCliente = (cliente) => {
        dispatch({
            type: BUSINESS_TYPES.CONSULTANDO_CLIENTE,
            payload: cliente
        })
    }
    const createDireccion = formData => {

        dispatch({
            type: BUSINESS_TYPES.CREATING_BUSINESS
        })

        api.post(`empresas/${state.empresaActual.id}/clientes/${state.clienteActual.id}/direcciones`, formData, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }) .then(response => {
            console.log(response.data)
            if (response.status === 201 ) {

                dispatch({
                    type: BUSINESS_TYPES.BUSINESS_CREATED
                });
                router.push(   `/business/${state.empresaActual.id}/clientes/${state.clienteActual.id}`)
            }
        }).catch(error => {
            dispatch({
                type: BUSINESS_TYPES.BUSINESS_ERROR,
                payload: error.response.data
            })
        });
    }
    const createBusiness = formData => {
        dispatch({
            type: BUSINESS_TYPES.CREATING_BUSINESS
        })

        api.post('empresas', formData, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }) .then(response => {
            if (response.status === 201 ) {

                dispatch({
                    type: BUSINESS_TYPES.BUSINESS_CREATED
                });
                router.push('/business')
            }
        }).catch(error => {
            dispatch({
                type: BUSINESS_TYPES.BUSINESS_ERROR,
                payload: error.response.data
            })
        });
    }

    const guardarCliente = formData => {
        dispatch({
            type: BUSINESS_TYPES.CREATING_BUSINESS
        })
        api.post(`empresas/${state.empresaActual.id}/clientes`, formData, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }) .then(response => {
            console.log(response.data)
            if (response.status === 201 ) {

                dispatch({
                    type: BUSINESS_TYPES.BUSINESS_CREATED
                });
                router.push(   `/business/${state.empresaActual.id}`)
            }
        }).catch(error => {
            dispatch({
                type: BUSINESS_TYPES.BUSINESS_ERROR,
                payload: error.response.data
            })
        });

    }
    return (
        <BusinessContext.Provider value={{
            error: state.error,
            creating: state.creating,
            created: state.created,
            empresaActual: state.empresaActual,
            clienteActual: state.clienteActual,
            consultandoEmpresa,
            consultandoCliente,
            createBusiness,
            guardarCliente,
            createDireccion
        }}>
            { props.children }
        </BusinessContext.Provider>
    );
};

export default BusinessState;