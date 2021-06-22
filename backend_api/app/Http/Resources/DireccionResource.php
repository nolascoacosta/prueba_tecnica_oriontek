<?php

namespace App\Http\Resources;

use App\Models\Direccion;
use Illuminate\Http\Resources\Json\JsonResource;

class DireccionResource extends JsonResource
{
    /** @var Direccion */
    public $resource;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->resource->id,
            'num_dep' => $this->resource->nombre_completo,
            'codigo_postal' => $this->resource->telefono,
            'sector' => $this->resource->telefono,
            'municipio' => $this->resource->telefono,
            'provincia' => $this->resource->telefono,
        ];
    }
}
