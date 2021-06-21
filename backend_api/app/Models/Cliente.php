<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
/** Representa un Cliente en la base de datos.
 *
 * @property int            $id
 * @property int            $empresa_id
 * @property string         $nombre_completo
 * @property string         $telefono
 * @property Carbon         $created_at
 * @property Carbon         $updated_at
 * @package App\Models
 */
class Cliente extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     *  @var string[]
     */
    protected $fillable = [
        'empresa_id',
        'nombre_completo',
        'telefono',
    ];
}
