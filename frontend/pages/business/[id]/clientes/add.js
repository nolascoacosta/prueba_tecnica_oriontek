import React, {useContext} from "react";
import BusinessContext from "../../../../context/business/businessContext";
import useForm from "../../../../hooks/useForm";
import Link from "next/link";

const Add = () => {
    const { empresaActual, guardarCliente, creating, error  } = useContext(BusinessContext)

    const { formValues, handleInputChange } = useForm({
        nombre_completo: '',
        telefono: ''
    });

    const handleSubmit = e => {
        e.preventDefault();
        guardarCliente(formValues)
    }
    return (
        <div>

            <div className="flex space-x-4 justify-end mb-5 mt-5">
                <div className="xs:text-xs sm:text-sm md:text-sm">
                    <Link href={`/business/${empresaActual.id}`}>
                        <p className="font-medium hover:bg-gray-50 rounded-xl cursor-pointer">Go back to Business {empresaActual.id}</p>
                    </Link>
                </div>
            </div>
            <form onSubmit={ handleSubmit }>
                <label htmlFor="nombre" className="block text-md font-bold">Nombre Completo</label>
                <div className="mt-1 mb-4">
                    <input type="text" name="nombre_completo"
                           className="w-full border border-green-300 px-2 py-2 rounded-lg
            shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                           maxLength="80"
                           placeholder="[Nombre Completo]"
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

export default Add;