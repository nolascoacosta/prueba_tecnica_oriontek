import React, {useContext, useEffect} from 'react';
import Link from "next/link";
import checkTokenInCookieRequest from "../../../helpers/checkTokenInCookieRequest";
import api from "../../../helpers/api";
import BusinessContext from "../../../context/business/businessContext";

const BusinessDetail = ({empresa}) => {
    const {  clientes } = empresa;
    const {consultandoEmpresa} = useContext(BusinessContext)
    useEffect(() => {
        consultandoEmpresa(empresa)
    }, [])
    return (
        <div>
            <div className="flex space-x-4 justify-end mb-5 mt-5">
                <div className="xs:text-xs sm:text-sm md:text-sm">
                    <Link href="/business">
                        <p className="font-medium hover:bg-gray-50 rounded-xl cursor-pointer">Show List of Business</p>
                    </Link>
                </div>
                <div className="xs:text-xs sm:text-sm md:text-sm">
                    <Link href={`/business/${empresa.id}/clientes/add`}>
                        <p className="font-medium hover:bg-gray-50 rounded-xl cursor-pointer">Add Cliente</p>
                    </Link>
                </div>
            </div>

            <div className="max-w mx-auto bg-white rounded-xl shadow-md overflow-hidden my-2 ">
                <div className="flex-1">
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-black font-semibold text-2xl mb-3">Empresa</div>
                        <div className=" tracking-wide text-sm text-green-500 font-semibold "><span className="text-black font-bold ">Nombre</span> : {empresa.nombre }</div>
                        <p className="mt-2 text-gray-500"><span className="text-black font-bold">Telefono</span> : { empresa.telefono}</p>

                    </div>
                </div>
            </div>

          {/*  { clientes && (
                <div className="max-w mx-auto bg-white rounded-xl shadow-md overflow-hidden my-2 ">
                    <div className="flex-1">
                        <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-green-500 font-semibold text-2xl"> {cliente.nombre_completo }</div>
                            <p className="mt-2 text-gray-500">{ empresa.telefono}</p>

                        </div>
                    </div>
                </div>
            )}*/}


            <div className="uppercase tracking-wide text-sm text-black font-semibold text-2xl mb-3 p-2">Clientes</div>
            { clientes && clientes.map(cliente => (
                <div className="max-w mx-auto bg-white rounded-xl shadow-md overflow-hidden my-2 " key={cliente.id}>
                    <div className="flex-1">
                        <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-green-500 font-semibold text-2xl"> {cliente.nombre_completo }</div>
                            <p className="mt-2 text-gray-500">{ empresa.telefono}</p>
                            <Link href={`/business/${empresa.id}/clientes/${cliente.id}`}>
                                <p className="font-medium cursor-pointer mt-3">Show Detail</p>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export async function getServerSideProps(context) {
    const { params } = context;
    try {
        checkTokenInCookieRequest(context);
        const response = await  api.get(`empresas/${params.id}`, {
            headers: {
                Authorization: 'Bearer ' + context.req.cookies.token
            }
        });

        let  empresa;
        if (response.status === 200) {
            empresa = response.data;
        }

        return {
            props: {
                empresa
            }
        }
    } catch (e) {
        if(e.response.status === 401) {
            return checkTokenInCookieRequest({})
        }
        return {
            props:  {
                empresa: e.response.data
            }
        }
    }
}


export default BusinessDetail;