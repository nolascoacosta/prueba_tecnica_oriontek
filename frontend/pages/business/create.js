import Link from "next/link";
import useForm from "../../hooks/useForm";
import {useContext, useEffect} from "react";
import BusinessContext from "../../context/business/businessContext";

const Create = () => {

    const businessContext = useContext(BusinessContext);

    const { createBusiness, creating, error } = businessContext;


    const { formValues, handleInputChange } = useForm({
        nombre: '',
        telefono: ''
    });

    const handleSubmit = e => {
        e.preventDefault();
        createBusiness(formValues)
    }

    return (
        <div>
            <div className="flex flex-col justify-center overscroll-auto">
                <h1 className="mb-4 text-xl font-bold text-green-500 text-center">Create Business</h1>
            </div>

            <div className="flex space-x-4 justify-end mb-5 mt-5">
                <div className="xs:text-xs sm:text-sm md:text-sm">
                    <Link href="/business">
                        <p className="font-medium hover:bg-gray-50 rounded-xl cursor-pointer">Show List of Business</p>
                    </Link>
                </div>
            </div>

            <form onSubmit={ handleSubmit }>
                <label htmlFor="nombre" className="block text-md font-bold">Nombre</label>
                <div className="mt-1 mb-4">
                    <input type="text" name="nombre"
                           className="w-full border border-green-300 px-2 py-2 rounded-lg
            shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                           maxLength="80"
                           placeholder="[Nombre Negocio]"
                           value={ formValues.nombre}
                           onChange={ handleInputChange }
                    />
                </div>

                <label htmlFor="telefono" className="block text-md font-bold">Teléfono </label>
                <div className="mt-1 mb-4">
                    <input type="tel" name="telefono"
                           className="w-full border border-green-300 px-2 py-2 rounded-lg
            shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                           maxLength="80"
                           placeholder="[Teléfono]"
                           value={ formValues.telefono}
                           onChange={ handleInputChange }
                    />
                </div>
                {
                    error && JSON.stringify(error)
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

export default Create;