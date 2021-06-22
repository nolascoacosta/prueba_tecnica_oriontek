import React, {useContext} from 'react';
import BusinessContext from "../../../../../context/business/businessContext";
import Link from "next/link";
import useForm from "../../../../../hooks/useForm";

const AddAddress = () => {

    const {clienteActual, empresaActual, createDireccion, creating, error} = useContext(BusinessContext)
    const { formValues, handleInputChange } = useForm({
        nombre: '',
        telefono: ''
    });


    const handleSubmit = e => {
        e.preventDefault();
        createDireccion(formValues)
    }
    return (
        <div>
            <div className="flex space-x-4 justify-end mb-5 mt-5">
                <div className="xs:text-xs sm:text-sm md:text-sm">
                    <Link href={`/business/${empresaActual.id}`}>
                        <p className="font-medium hover:bg-gray-50 rounded-xl cursor-pointer">Go back to Business {empresaActual.id}</p>
                    </Link>
                </div>
                <div className="xs:text-xs sm:text-sm md:text-sm">
                    <Link href={`/business/${empresaActual.id}/clientes/${clienteActual.id}`}>
                        <p className="font-medium hover:bg-gray-50 rounded-xl cursor-pointer">Go back to cliente {clienteActual.id}</p>
                    </Link>
                </div>
            </div>

            <div className="max-w mx-auto bg-white rounded-xl shadow-md overflow-hidden my-2 ">
                <div className="flex-1">
                    <div className="p-8">
                        <div className=" tracking-wide text-sm text-green-500 font-semibold text-2xl"><span className="text-black font-bold ">Cliente : </span> {clienteActual.nombre_completo }</div>
                        <p className="mt-2 text-gray-500"><span className="text-black font-bold ">Telefono : </span>{ clienteActual.telefono}</p>
                    </div>
                </div>
            </div>

            <form onSubmit={ handleSubmit }>
                <label htmlFor="calle" className="block text-md font-bold">Calle</label>
                <div className="mt-1 mb-4">
                    <input type="text" name="calle"
                           className="w-full border border-green-300 px-2 py-2 rounded-lg
            shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                           maxLength="80"
                           placeholder="[calle]"
                           value={ formValues.calle}
                           onChange={ handleInputChange }
                    />
                </div>

                <label htmlFor="num_dep" className="block text-md font-bold">Num. Dep. </label>
                <div className="mt-1 mb-4">
                    <input type="tel" name="num_dep"
                           className="w-full border border-green-300 px-2 py-2 rounded-lg
            shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                           maxLength="80"
                           placeholder="[Num. Dep.]"
                           value={ formValues.num_dep}
                           onChange={ handleInputChange }
                    />
                </div>
                <label htmlFor="codigo_postal" className="block text-md font-bold">Codigo Postal </label>
                <div className="mt-1 mb-4">
                    <input type="tel" name="codigo_postal"
                           className="w-full border border-green-300 px-2 py-2 rounded-lg
            shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                           maxLength="80"
                           placeholder="[codigo_postal]"
                           value={ formValues.codigo_postal}
                           onChange={ handleInputChange }
                    />
                </div>
                <label htmlFor="sector" className="block text-md font-bold">Sector </label>
                <div className="mt-1 mb-4">
                    <input type="tel" name="sector"
                           className="w-full border border-green-300 px-2 py-2 rounded-lg
            shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                           maxLength="80"
                           placeholder="[Sector]"
                           value={ formValues.sector}
                           onChange={ handleInputChange }
                    />
                </div>
                <label htmlFor="municipio" className="block text-md font-bold">Municipio </label>
                <div className="mt-1 mb-4">
                    <input type="tel" name="municipio"
                           className="w-full border border-green-300 px-2 py-2 rounded-lg
            shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                           maxLength="80"
                           placeholder="[Municipio]"
                           value={ formValues.municipio}
                           onChange={ handleInputChange }
                    />
                </div>
                <label htmlFor="provincia" className="block text-md font-bold">Provincia </label>
                <div className="mt-1 mb-4">
                    <input type="tel" name="provincia"
                           className="w-full border border-green-300 px-2 py-2 rounded-lg
            shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                           maxLength="80"
                           placeholder="[Provincia]"
                           value={ formValues.provincia}
                           onChange={ handleInputChange }
                    />
                </div>
                {
                    error && (
                        JSON.stringify(error)
                    )
                }

                <div className="mt-1">
                    <button type="submit"
                            className={`w-full flex justify-center py-2 border border-transparent rounded-md shadow-md text-md font-medium text-white bg-green-500 hover:bg-green-600
          focus:outline-none ${ creating ? 'cursor-not-allowed opacity-50' : '' }  `} disabled={creating}>
                        Save
                    </button>
                </div>
            </form>

        </div>
    );
};

/*
* 'calle',
        'num_dep',
        'codigo_postal',
        'sector',
        'municipio',
        'provincia',*/

export default AddAddress;