import React from 'react';
import checkTokenInCookieRequest from "../../helpers/checkTokenInCookieRequest";
import api from "../../helpers/api";
import Link from "next/link";
const Index = ({ data }) => {
    return (
        <div>
            <div className="flex space-x-4 justify-end mb-5 mt-5">
                <div className="xs:text-xs sm:text-sm md:text-sm">
                    <Link href="/business/create">
                        <p className="font-medium hover:bg-gray-50 rounded-xl cursor-pointer">Create Business</p>
                    </Link>
                </div>
            </div>



            {
                data.data.map(busines => (
                    <div className="max-w mx-auto bg-white rounded-xl shadow-md overflow-hidden my-2 " key={busines.id}>
                        <div className="flex-1">
                            <div className="p-8">
                                <div className=" tracking-wide text-sm text-green-500 font-bold"> <span className="text-black font-bold ">Nombre </span> : { busines.nombre }</div>
                                <p className="mt-2 text-gray-500 "><span className="text-black font-bold  ">Telefono</span> : { busines.telefono}</p>
                                <Link className="mt-5" href={`/business/${busines.id}`}>
                                    <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Show Detail</a>
                                </Link>

                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export async function getServerSideProps(context) {
    try {
        checkTokenInCookieRequest(context);
        const response = await  api.get('empresas', {
            headers: {
                Authorization: 'Bearer ' + context.req.cookies.token
            }
        });

        let  data;
        if (response.status === 200) {
            data = response.data;
        }

        return {
            props: {
                data
            }
        }
    } catch (e) {
        if(e.response.status === 401) {
            return checkTokenInCookieRequest({})
        }
        return {
            props:  {
                data: e.response.data
            }
        }
    }
}


export default Index;