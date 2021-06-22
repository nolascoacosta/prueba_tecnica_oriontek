import React, {useContext, useEffect} from "react";
import BusinessContext from "../../../../../context/business/businessContext";
import checkTokenInCookieRequest from "../../../../../helpers/checkTokenInCookieRequest";
import api from "../../../../../helpers/api";
import Link from "next/link";

const Index = ({cliente}) => {
    const {empresaActual, consultandoCliente} = useContext(BusinessContext)
    const { direcciones } = cliente;
    useEffect(() => {
        consultandoCliente(cliente)
    }, [])

    return (
        <div>
            <div className="flex space-x-4 justify-end mb-5 mt-5">
                <div className="xs:text-xs sm:text-sm md:text-sm">
                    <Link href={`/business/${empresaActual.id}`}>
                        <p className="font-medium hover:bg-gray-50 rounded-xl cursor-pointer">Go back to {empresaActual.nombre} - {empresaActual.id }</p>
                    </Link>
                </div>
                <div className="xs:text-xs sm:text-sm md:text-sm">
                    <Link href={`/business/${empresaActual.id}/clientes/${cliente.id}/add-address`}>
                        <p className="font-medium hover:bg-gray-50 rounded-xl cursor-pointer">Add Address</p>
                    </Link>
                </div>
            </div>

            <div className="max-w mx-auto bg-white rounded-xl shadow-md overflow-hidden my-2 " key={cliente.id}>
                <div className="flex-1">
                    <div className="p-8">
                        <div className=" tracking-wide text-sm text-green-500 font-semibold text-2xl"><span className="text-black font-bold ">Cliente : </span> {cliente.nombre_completo }</div>
                        <p className="mt-2 text-gray-500"><span className="text-black font-bold ">Telefono : </span>{ empresaActual.telefono}</p>
                    </div>
                </div>
            </div>
            {
                direcciones.length > 0 && (
                    direcciones.map(direccion => (
                        <div className="max-w mx-auto bg-white rounded-xl shadow-md overflow-hidden my-2" key={direccion.id}>
                            <div className="flex-1">
                                <div className="p-8">
                                    <div className="uppercase tracking-wide text-sm text-black font-semibold text-2xl mb-3">Direccion : { direccion.id }</div>
                                    <div className=" tracking-wide text-sm text-green-500 font-semibold "><span className="text-black font-bold ">Calle </span> : { direccion.calle} </div>
                                    <div className=" tracking-wide text-sm text-green-500 font-semibold "><span className="text-black font-bold ">Num. Dep. </span> : { direccion.num_dep} </div>
                                    <div className=" tracking-wide text-sm text-green-500 font-semibold "><span className="text-black font-bold ">Codigo Postal. </span> : { direccion.codigo_postal} </div>
                                    <div className=" tracking-wide text-sm text-green-500 font-semibold "><span className="text-black font-bold ">Sector  </span> : { direccion.sector} </div>
                                    <div className=" tracking-wide text-sm text-green-500 font-semibold "><span className="text-black font-bold ">Municipio  </span> : { direccion.municipio} </div>
                                    <div className=" tracking-wide text-sm text-green-500 font-semibold "><span className="text-black font-bold ">Provincia  </span> : { direccion.provincia} </div>
                                </div>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    );
};

export async function getServerSideProps(context) {
    const { params } = context;
    const { id: idEmpresa , clienteId} = params;

    try {
        checkTokenInCookieRequest(context);
        const response = await  api.get(`empresas/${idEmpresa}/clientes/${clienteId}`, {
            headers: {
                Authorization: 'Bearer ' + context.req.cookies.token
            }
        });

        let  cliente;
        if (response.status === 200) {
            cliente = response.data;
        }

        return {
            props: {
                cliente
            }
        }
    } catch (e) {
        if(e.response.status === 401) {
            return checkTokenInCookieRequest({})
        }
        return {
            props:  {
                cliente: e.response.data
            }
        }
    }
}

export default Index;