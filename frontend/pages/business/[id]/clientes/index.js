import BusinessContext from "../../../../context/business/businessContext";
import {useContext} from "react";

const ListaClientes = () => {
    const { empresaActual } = useContext(BusinessContext)
    return (
        <div>
            <h1>ListaClientes</h1>
            { JSON.stringify(empresaActual)}
        </div>
    );
};

export default ListaClientes;