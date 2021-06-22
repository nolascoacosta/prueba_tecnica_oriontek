<?php

namespace App\Http\Resources;

use App\Models\Empresa;
use Illuminate\Http\Resources\Json\JsonResource;

class EmpresaResource extends JsonResource
{
    /** @var Empresa */
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
            'nombre' => $this->resource->nombre,
            'telefono' => $this->resource->telefono,
            'user' => new UserResource($this->whenLoaded('user')),
            'clientes' => new ClienteResource($this->whenLoaded('clientes'))
        ];
    }
}
