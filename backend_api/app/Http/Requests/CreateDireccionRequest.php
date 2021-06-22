<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateDireccionRequest extends ApiFormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'calle'         => 'required|min:3|max:12|unique:direccions,calle',
            'num_dep'       => 'required|min:1|max:3',
            'codigo_postal' => 'required|min:5|max:5',
            'sector'        => 'required|min:8|max:80',
            'municipio'     => 'required|min:8|max:80',
            'provincia'     => 'required|min:8|max:80',
        ];
    }
}
