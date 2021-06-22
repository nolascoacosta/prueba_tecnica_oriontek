<?php

namespace App\Http\Resources;

use App\Models\Cliente;
use Illuminate\Http\Resources\Json\JsonResource;

class ClienteResource extends JsonResource
{
    /** @var Cliente */
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
            'nombre_completo' => $this->resource->nombre_completo,
            'telefono' => $this->resource->telefono,
            'direcciones' => new DireccionResource($this->whenLoaded('direcciones'))
        ];
    }
}
