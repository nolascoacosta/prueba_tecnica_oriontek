<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateClienteRequest  extends ApiFormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        // dd($this->user());
        $userID = $this->user()->id;
        return [
            'nombre_completo' => "required|min:2|max:255|unique:clientes,nombre_completo,empresa_id,",
            'telefono' => 'required|min:8|max:12',
        ];
    }
}
/*
 * 'nombre' => [
                'required',
                Rule::unique('empresas')->where(function ($query) use($userID){
                    $query->where('user_id',$userID)
                        ->where('nombre', $this->nombre);
                })
            ],*/
