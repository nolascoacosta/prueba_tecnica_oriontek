<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateEmpresaRequest;
use App\Http\Requests\UpdateEmpresaRequest;
use App\Http\Resources\EmpresaResource;
use App\Models\Empresa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmpresaController extends ApiController
{
    protected const LOADABLE = [
        'user',
        'clientes',
    ];
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)/*: \Illuminate\Http\Resources\Json\AnonymousResourceCollection*/
    {
       // return Empresa::with('clientes')->get();
         return Empresa::with('clientes.direcciones')->paginate();
       /*  return $empresas;
        return (is_null($request->get('include')))
            ? EmpresaResource::collection($empresas)
            : EmpresaResource::collection(
                $this->loadRelationships($empresas, $request->get('include'))
            );*/
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return EmpresaResource|\Illuminate\Http\JsonResponse
     */
    public function store(CreateEmpresaRequest $request)
    {
        try {
            DB::beginTransaction();
            $request->merge(["user_id"=> auth()->user()->id]);

            $empresa = Empresa::create($request->all());
            DB::commit();
            return new EmpresaResource($empresa);

        }catch (\Exception $exception) {
            DB::rollBack();
            return  $this->messageBuilder->sendErrorReponse($exception->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Empresa  $empresa
     * @return EmpresaResource
     */
    public function show(Empresa $empresa, Request $request)
    {
        return Empresa::with('clientes.direcciones')->first();
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Empresa  $empresa
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateEmpresaRequest $request, Empresa $empresa)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Empresa  $empresa
     * @return \Illuminate\Http\Response
     */
    public function destroy(Empresa $empresa)
    {
        //
    }
}
