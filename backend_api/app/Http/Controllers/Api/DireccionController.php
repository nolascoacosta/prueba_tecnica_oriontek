<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateDireccionRequest;
use App\Http\Resources\DireccionResource;
use App\Models\Cliente;
use App\Models\Direccion;
use App\Models\Empresa;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;

class DireccionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Empresa $empresa, Cliente $cliente, CreateDireccionRequest $request)
    {
        try {
            DB::beginTransaction();

            $direccion = new Direccion;
            $direccion->calle = $request->get("calle");
            $direccion->num_dep = $request->get("num_dep");
            $direccion->codigo_postal = $request->get("codigo_postal");
            $direccion->sector = $request->get("sector");
            $direccion->municipio = $request->get("municipio");
            $direccion->provincia = $request->get("provincia");
            $cliente->direcciones()->save($direccion);
            DB::commit();
            return new DireccionResource($direccion);

        }catch (\Exception $exception) {
            DB::rollBack();
            return  $this->messageBuilder->sendErrorReponse($exception->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Direccion  $direccion
     * @return \Illuminate\Http\Response
     */
    public function show(Direccion $direccion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Direccion  $direccion
     * @return \Illuminate\Http\Response
     */
    public function edit(Direccion $direccion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Direccion  $direccion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Direccion $direccion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Direccion  $direccion
     * @return \Illuminate\Http\Response
     */
    public function destroy(Direccion $direccion)
    {
        //
    }
}
